function optimizeMesh(geometry){






  var globalGeometry;

  var cb = new ONE.Vector3(),
    ab = new ONE.Vector3();
  
  function pushIfUnique(array, object) {
    if (array.indexOf(object) === -1) array.push(object);
  }
  
  function removeFromArray(array, object) {
    var k = array.indexOf(object);
    if (k > -1) array.splice(k, 1);
  }
  
  function computeEdgeCollapseCost(u, v) {
    // if we collapse edge uv by moving u to v then how
    // much different will the model change, i.e. the "error".
  
    var edgelength = v.position.distanceTo(u.position);
    var curvature = 0;
  
    var sideFaces = [];
    var i,
      uFaces = u.faces,
      il = u.faces.length,
      face,
      sideFace;
  
    // find the "sides" triangles that are on the edge uv
    for (i = 0; i < il; i++) {
      face = u.faces[i];
  
      if (face.hasVertex(v)) {
        sideFaces.push(face);
      }
    }
  
    // use the triangle facing most away from the sides
    // to determine our curvature term
    for (i = 0; i < il; i++) {
      var minCurvature = 1;
      face = u.faces[i];
  
      for (var j = 0; j < sideFaces.length; j++) {
        sideFace = sideFaces[j];
        // use dot product of face normals.
        var dotProd = face.normal.dot(sideFace.normal);
        minCurvature = Math.min(minCurvature, (1.001 - dotProd) / 2);
      }
  
      curvature = Math.max(curvature, minCurvature);
    }
  
    // crude approach in attempt to preserve borders
    // though it seems not to be totally correct
    var borders = 0;
    if (sideFaces.length < 2) {
      // we add some arbitrary cost for borders,
      // borders += 10;
      curvature = 1;
    }
  
    var amt = edgelength * curvature + borders;
  
    return amt;
  }
  
  function computeEdgeCostAtVertex(v) {
    // compute the edge collapse cost for all edges that start
    // from vertex v.  Since we are only interested in reducing
    // the object by selecting the min cost edge at each step, we
    // only cache the cost of the least cost edge at this vertex
    // (in member variable collapse) as well as the value of the
    // cost (in member variable collapseCost).
  
    if (v.neighbors.length === 0) {
      // collapse if no neighbors.
      v.collapseNeighbor = null;
      v.collapseCost = -0.01;
  
      return;
    }
  
    v.collapseCost = 100000;
    v.collapseNeighbor = null;
  
    // search all neighboring edges for "least cost" edge
    for (var i = 0; i < v.neighbors.length; i++) {
      var collapseCost = computeEdgeCollapseCost(v, v.neighbors[i]);
  
      if (!v.collapseNeighbor) {
        v.collapseNeighbor = v.neighbors[i];
        v.collapseCost = collapseCost;
        v.minCost = collapseCost;
        v.totalCost = 0;
        v.costCount = 0;
      }
  
      v.costCount++;
      v.totalCost += collapseCost;
  
      if (collapseCost < v.minCost) {
        v.collapseNeighbor = v.neighbors[i];
        v.minCost = collapseCost;
      }
    }
  
    // we average the cost of collapsing at this vertex
    v.collapseCost = v.totalCost / v.costCount;
    // v.collapseCost = v.minCost;
  }
  
  function removeVertex(v, vertices) {
    console.assert(v.faces.length === 0);
  
    while (v.neighbors.length) {
      var n = v.neighbors.pop();
      removeFromArray(n.neighbors, v);
    }
  
    removeFromArray(vertices, v);
  }
  
  function removeFace(f, faces) {
    removeFromArray(faces, f);
  
    if (f.v1) removeFromArray(f.v1.faces, f);
    if (f.v2) removeFromArray(f.v2.faces, f);
    if (f.v3) removeFromArray(f.v3.faces, f);
  
    // TODO optimize this!
    var vs = [f.v1, f.v2, f.v3];
    var v1, v2;
  
    for (var i = 0; i < 3; i++) {
      v1 = vs[i];
      v2 = vs[(i + 1) % 3];
  
      if (!v1 || !v2) continue;
      v1.removeIfNonNeighbor(v2);
      v2.removeIfNonNeighbor(v1);
    }
  }
  let max = 100;
  function collapse(vertices, faces, u, v, preserveTexture) {
    // u and v are pointers to vertices of an edge
    // Collapse the edge uv by moving vertex u onto v
  
    if (!v) {
      // u is a vertex all by itself so just delete it..
      removeVertex(u, vertices);
      return;
    }
  
    var i;
    var tmpVertices = [];
  
    for (i = 0; i < u.neighbors.length; i++) {
      tmpVertices.push(u.neighbors[i]);
    }
  
    var moveToThisUvsValues = [];
  
    // delete triangles on edge uv:
    for (i = u.faces.length - 1; i >= 0; i--) {
      if (u.faces[i].hasVertex(v)) {
        if (preserveTexture) moveToThisUvsValues = getUVsOnVertex(u.faces[i], v);
        removeFace(u.faces[i], faces);
      }
    }
  
    if (preserveTexture) {
      for (i = u.faces.length - 1; i >= 0; i--) {
        var face = u.faces[i];
        if (max > 0) {
          const dist1 = face.v1.position.distanceTo(face.v2.position);
          const dist2 = face.v2.position.distanceTo(face.v3.position);
          const dist3 = Math.sqrt(dist1 * dist1 + dist2 * dist2);
          const angles = getTriangleAnglesFromDistances(dist1, dist2, dist3);
          const anglesUV = getAnglesFromPoints(face.faceVertexUvs);
          // console.log(angles, anglesUV);
          max--;
        }
        var faceVerticeUVs = getUVsOnVertex(u.faces[i], u);
        // console.log(faceVerticeUVs)
  
        var verticeDistance = u.position.distanceTo(v.position);
        var size = globalGeometry.boundingSphere.radius * 2;
        var percentageChangeVertexShift = 100 / size * verticeDistance;
  
        var deltaX = Math.abs(100 * (moveToThisUvsValues.x - faceVerticeUVs.x));
        var deltaY = Math.abs(100 * (moveToThisUvsValues.y - faceVerticeUVs.y));
        var percentageChangeTextureCorrds = Math.max(deltaX, deltaY);
  
        // safety check from strange results:
        // if texture shift percentage is much higher than
        // vertex position shift in relation to object size
        if (
          Math.abs(percentageChangeTextureCorrds - percentageChangeVertexShift) >
          5
        ) {
          continue;
        }
  
        faceVerticeUVs.x = moveToThisUvsValues.x;
        faceVerticeUVs.y = moveToThisUvsValues.y;
      }
      // console.log("looped thru faces")
    }
  
    // update remaining triangles to have v instead of u
    for (i = u.faces.length - 1; i >= 0; i--) {
      u.faces[i].replaceVertex(u, v);
    }
  
    removeVertex(u, vertices);
  
    // recompute the edge collapse costs in neighborhood
    for (i = 0; i < tmpVertices.length; i++) {
      computeEdgeCostAtVertex(tmpVertices[i]);
    }
  }
  
  function getUVsOnVertex(face, vertex) {
    return face.faceVertexUvs[getVertexIndexOnFace(face, vertex)];
  }
  
  function getVertexIndexOnFace(face, vertex) {
    return [face.v1, face.v2, face.v3].indexOf(vertex);
  }
  
  function minimumCostEdge(vertices) {
    // O(n * n) approach. TODO optimize this
  
    var least = vertices[0];
  
    for (var i = 0; i < vertices.length; i++) {
      if (vertices[i].collapseCost < least.collapseCost) {
        least = vertices[i];
      }
    }
  
    return least;
  }
  
  // we use a triangle class to represent structure of face slightly differently
  
  function Triangle(v1, v2, v3, a, b, c, fvuv, materialIndex) {
    this.a = a;
    this.b = b;
    this.c = c;
  
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
  
    this.normal = new ONE.Vector3();
    this.faceVertexUvs = fvuv;
    this.materialIndex = materialIndex;
  
    this.computeNormal();
  
    v1.faces.push(this);
    v1.addUniqueNeighbor(v2);
    v1.addUniqueNeighbor(v3);
  
    v2.faces.push(this);
    v2.addUniqueNeighbor(v1);
    v2.addUniqueNeighbor(v3);
  
    v3.faces.push(this);
    v3.addUniqueNeighbor(v1);
    v3.addUniqueNeighbor(v2);
  }
  
  Triangle.prototype.computeNormal = function() {
    var vA = this.v1.position;
    var vB = this.v2.position;
    var vC = this.v3.position;
  
    cb.subVectors(vC, vB);
    ab.subVectors(vA, vB);
    cb.cross(ab).normalize();
  
    this.normal.copy(cb);
  };
  
  Triangle.prototype.hasVertex = function(v) {
    return v === this.v1 || v === this.v2 || v === this.v3;
  };
  
  Triangle.prototype.replaceVertex = function(oldv, newv) {
    if (oldv === this.v1) this.v1 = newv;
    else if (oldv === this.v2) this.v2 = newv;
    else if (oldv === this.v3) this.v3 = newv;
  
    removeFromArray(oldv.faces, this);
    newv.faces.push(this);
  
    oldv.removeIfNonNeighbor(this.v1);
    this.v1.removeIfNonNeighbor(oldv);
  
    oldv.removeIfNonNeighbor(this.v2);
    this.v2.removeIfNonNeighbor(oldv);
  
    oldv.removeIfNonNeighbor(this.v3);
    this.v3.removeIfNonNeighbor(oldv);
  
    this.v1.addUniqueNeighbor(this.v2);
    this.v1.addUniqueNeighbor(this.v3);
  
    this.v2.addUniqueNeighbor(this.v1);
    this.v2.addUniqueNeighbor(this.v3);
  
    this.v3.addUniqueNeighbor(this.v1);
    this.v3.addUniqueNeighbor(this.v2);
  
    this.computeNormal();
  };
  
  function Vertex(v, id) {
    this.position = v;
  
    this.id = id; // old index id
  
    this.faces = []; // faces vertex is connected
    this.neighbors = []; // neighbouring vertices aka "adjacentVertices"
  
    // these will be computed in computeEdgeCostAtVertex()
    this.collapseCost = 0; // cost of collapsing this vertex, the less the better. aka objdist
    this.collapseNeighbor = null; // best candinate for collapsing
  }
  
  Vertex.prototype.addUniqueNeighbor = function(vertex) {
    pushIfUnique(this.neighbors, vertex);
  };
  
  Vertex.prototype.removeIfNonNeighbor = function(n) {
    var neighbors = this.neighbors;
    var faces = this.faces;
  
    var offset = neighbors.indexOf(n);
    if (offset === -1) return;
    for (var i = 0; i < faces.length; i++) {
      if (faces[i].hasVertex(n)) return;
    }
  
    neighbors.splice(offset, 1);
  };
  
  /**
   * modify - will reduce vertices and faces count
   * mergeVertices might be needed prior
   * @param count int how many vertices to remove ie. 60% removal Math.round(geo.vertices.count * 0.6)
   **/
  
  const lowerLimit = 51;
  function simplifyMesh(geometryRaw, percentage, preserveTexture) {
    let isBufferGeometry = false;
    let geometry = geometryRaw;
  
    if (
      geometry instanceof ONE.BufferGeometry &&
      !geometry.vertices &&
      !geometry.faces
    ) {
      if (geometry.attributes.position.count < lowerLimit * 3) {
        return geometry;
      }
  
      console.log("converting BufferGeometry to Geometry");
      geometry = new ONE.Geometry().fromBufferGeometry(geometry);
      isBufferGeometry = true;
      // console.log(geometry)
    }
  
    globalGeometry = geometry;
    if (!globalGeometry.boundingSphere) {
      globalGeometry.computeBoundingSphere();
    }
  
    if (geometry.vertices.length < 50) {
      return geometryRaw;
    }
  
    geometry.mergeVertices();
    geometry.computeVertexNormals();
  
    var oldVertices = geometry.vertices; // Three Position
    var oldFaces = geometry.faces; // Three Face
    var oldFaceUVs = geometry.faceVertexUvs[0];
  
    // conversion
    var vertices = new Array(oldVertices.length); // Simplify Custom Vertex Struct
    var faces = new Array(oldFaces.length); // Simplify Custom Traignle Struct
    var faceUVs = []; // rebuild UVs
  
    var i, il, face;
  
    //
    // put data of original geometry in different data structures
    //
  
    // add vertices
    for (i = 0, il = oldVertices.length; i < il; i++) {
      vertices[i] = new Vertex(oldVertices[i], i);
    }
  
    if (preserveTexture && oldFaceUVs.length) {
      // add UVs
      for (i = 0; i < oldFaceUVs.length; i++) {
        const faceUV = oldFaceUVs[i];
  
        faceUVs.push([
          new ONE.Vector2(faceUV[0].x, faceUV[0].y),
          new ONE.Vector2(faceUV[1].x, faceUV[1].y),
          new ONE.Vector2(faceUV[2].x, faceUV[2].y)
        ]);
      }
    }
  
    // add faces
    for (i = 0, il = oldFaces.length; i < il; i++) {
      face = oldFaces[i];
      faces[i] = new Triangle(
        vertices[face.a],
        vertices[face.b],
        vertices[face.c],
        face.a,
        face.b,
        face.c,
        faceUVs[i],
        face.materialIndex
      );
    }
  
    // compute all edge collapse costs
    for (i = 0, il = vertices.length; i < il; i++) {
      computeEdgeCostAtVertex(vertices[i]);
    }
  
    var nextVertex;
    var z = Math.round(geometry.vertices.length * percentage);
  
    // console.time('z')
    // console.profile('zz');
  
    while (z--) {
      nextVertex = minimumCostEdge(vertices);
      if (!nextVertex) {
        // console.log("no next vertex");
        break;
      }
  
      collapse(
        vertices,
        faces,
        nextVertex,
        nextVertex.collapseNeighbor,
        preserveTexture
      );
    }
  
    // console.profileEnd('zz');
    // console.timeEnd('z')
  
    // TODO convert to buffer geometry.
    var newGeo = new ONE.Geometry();
    if (oldFaceUVs.length) newGeo.faceVertexUvs[0] = [];
  
    for (i = 0; i < vertices.length; i++) {
      var v = vertices[i];
      newGeo.vertices.push(v.position);
    }
    for (i = 0; i < faces.length; i++) {
      var tri = faces[i];
      newGeo.faces.push(
        new ONE.Face3(
          vertices.indexOf(tri.v1),
          vertices.indexOf(tri.v2),
          vertices.indexOf(tri.v3),
          undefined,
          undefined,
          tri.materialIndex
        )
      );
  
      if (oldFaceUVs.length) newGeo.faceVertexUvs[0].push(faces[i].faceVertexUvs);
    }
  
    newGeo.mergeVertices();
    newGeo.computeVertexNormals();
    newGeo.computeFaceNormals();
    newGeo.name = geometry.name;
  
  //   document.getElementById("before-after").innerHTML = `Before ${
  //     oldVertices.length
  //   }<br>
  //   After ${newGeo.vertices.length}`;
  
    // console.log(`face change from ${geometry.faces.length} to ${newGeo.faces.length}`);
  
    return isBufferGeometry ? new ONE.BufferGeometry().fromGeometry(newGeo) : newGeo;
  }
  
  // export default simplifyMesh;
  
  function getTriangleAnglesFromDistances(a, b, c) {
    var A, B, C, R, s, pi, area;
    pi = Math.PI;
  
    s = (a + b + c) / 2;
  
    area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  
    R = a * b * c / (4 * area);
  
    A = 180 / pi * Math.asin(a / (2 * R));
    B = 180 / pi * Math.asin(b / (2 * R));
    C = 180 / pi * Math.asin(c / (2 * R));
  
    return [A, B, C];
  }
  
  function getAnglesFromPoints(uvs) {
    const pointA = uvs[0];
    const pointB = uvs[1];
    const pointC = uvs[2];
  
    const dist1 = Math.sqrt(
      Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2)
    );
    const dist2 = Math.sqrt(
      Math.pow(pointB.x - pointC.x, 2) + Math.pow(pointB.y - pointC.y, 2)
    );
    const dist3 = Math.sqrt(dist1 * dist1 + dist2 * dist2);
    return getTriangleAnglesFromDistances(dist1, dist2, dist3);
  }



  // postMessage( 
    
  // [{color: [message.attributes.color.array], 
  // normal: [message.attributes.normal.array], 
  // position: [message.attributes.position.array], 
  // uv:[message.attributes.uv.array], 
  // index:[message.index.array]}, e.data[1], e.data[5], 
  // {color: [message2.attributes.color.array], 
  // normal: [message2.attributes.normal.array], 
  // position: [message2.attributes.position.array], 
  // uv:[message2.attributes.uv.array], 
  // index:[message2.index.array]}] ); //add to worker B) //don't use .toNonIndexed()

// let color = geometry.attributes.color.array
let normal =  geometry.attributes.normal.array
let position = geometry.attributes.position.array
let uv = geometry.attributes.uv.array
let index = geometry.index.array


  // console.log(ONE)

  // let object = new ONE.Object3D();
  let buffer = new ONE.BufferGeometry()
  
  
  buffer.attributes.normal= new ONE.BufferAttribute( normal, 3 )
      buffer.attributes.normal.needsUpdate = true
      // console.log(buffer)
      
      let positionsFloat = new Float32Array(position)
      buffer.attributes.position= new ONE.BufferAttribute( positionsFloat, 3 )
      buffer.attributes.position.needsUpdate = true
      
      // buffer.attributes.color = new ONE.BufferAttribute(color, 3)
      // buffer.attributes.color.needsUpdate = true
      
      // buffer.attributes.color = []
      // buffer.attributes.color.needsUpdate = true
      
      
      buffer.attributes.uv= new ONE.BufferAttribute( uv, 2 )
      buffer.attributes.uv.needsUpdate = true
      buffer.index = new ONE.BufferAttribute( index, 1 )
      buffer.index.needsUpdate = true
      buffer.needsUpdate = true;
      console.log("BUFINDEX", index, buffer)

      // console.log("BUFFER", buffer)
      
        // console.log("PARSED", e.data[0])
        // console.log("PARSED", buffer)
      
      
      
        buffer.computeBoundingBox()
  
                  // function optimizeModel() {
                // scene.remove(elfOptimized);
                // let elfOptimized = buffer.clone();

                // reductionNumber = 0.8

                 let optimized = simplifyMesh(
                  buffer,
                  0.87, //OPTIMIZE NUMBER //PERCENT //RATE //1 = 100% 0.3 = 30% //SIMPLIFY NUMBER
                  true
                );

                console.log(optimized, "BUFOPTIMIZED")
  
                // console.log("OPTIMIZED", optimized)
                // console.log("OPTIMIZED", optimized.attributes)
                // console.log("OPTIMIZED", optimized.attributes.position)
                // console.log("OPTIMIZED", optimized.index)


                let geometry2 = new THREE.BufferGeometry()
                let typed = new Float32Array(optimized.attributes.position.array);
                // console.log(geometry2)
      
                geometry2.attributes.position= new THREE.BufferAttribute( typed, 3 )
                geometry2.attributes.position.needsUpdate = true
      
      
                // let colorBufferArray = new Uint8Array(optimized.attributes.color.array)
                // geometry2.attributes.color = new THREE.BufferAttribute(colorBufferArray, 3);
                // geometry2.attributes.color.needsUpdate = true
      
                let uvArray = new Float32Array(optimized.attributes.uv.array)
                geometry2.attributes.uv = new THREE.BufferAttribute(uvArray, 2);
                geometry2.attributes.uv.needsUpdate = true

                return geometry2


}