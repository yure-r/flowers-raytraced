import * as THREE from "./three.js-r148/build/three.module.js";
// import * as BufferGeometryUtils from "./three.js-r148/examples/jsm/utils/BufferGeometryUtils.js"
import "./three.js-r110/build/two.min.js"
import "./three.js-r110/examples/js/utils/BufferGeometryUtils.two.js"
import CSG from "./three-csg-worker.js"
import * as ONE from "./one.js-r100/build/one.module.js"

// console.log(CSG)

// if( 'function' === typeof importScripts) {
    // importScripts("./three.js-r148/build/three.min.js");
    // importScripts("./three.js-r148/examples/jsm/utils/BufferGeometryUtils.js")

    addEventListener('message', onMessage);
    // console.log("INITIALIZED DOT WORKER")

    // const lowerLimit = 51;
    // var globalGeometry;
    let  createdGeometries = []
function simplifyMessage(paramsArray){






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

    let meshes = []

for (var i=0; i<paramsArray.length;i++){

    // let color = paramsArray[i],
    let normal =  paramsArray[i].normal
    let position = paramsArray[i].positions
    let uv = paramsArray[i].uv
    let index = paramsArray[i].index
    
    
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
              
                  // console.log("BUFFER", buffer)
                  
                    // console.log("PARSED", e.data[0])
                    // console.log("PARSED", buffer)
                  
                  
                  
                    buffer.computeBoundingBox()
              
                              // function optimizeModel() {
                            // scene.remove(elfOptimized);
                            // let elfOptimized = buffer.clone();
                             let optimized = simplifyMesh(
                              buffer,
                              0.0005, //OPTIMIZE NUMBER //PERCENT //RATE //1 = 100% 0.3 = 30% //SIMPLIFY NUMBER
                              true
                            );
              
                            disposeNode(buffer)

                            // console.log("OPTIMIZED", optimized)
                            // console.log("OPTIMIZED", optimized.attributes)
                            // console.log("OPTIMIZED", optimized.attributes.position)
                            // console.log("OPTIMIZED", optimized.index)
    
    
                            let geometry = new TWO.BufferGeometry()
                            let typed = new Float32Array(optimized.attributes.position.array);
                            // console.log(geometry)
                  
                            geometry.attributes.position= new TWO.BufferAttribute( typed, 3 )
                            geometry.attributes.position.needsUpdate = true
                  
                  
                            let colorBufferArray = new Uint8Array(optimized.attributes.color.array)
                            geometry.attributes.color = new TWO.BufferAttribute(colorBufferArray, 3);
                            geometry.attributes.color.needsUpdate = true
                  
                            let uvArray = new Float32Array(optimized.attributes.uv.array)
                            geometry.attributes.uv = new TWO.BufferAttribute(uvArray, 2);
                            geometry.attributes.uv.needsUpdate = true
    
                            geometry = TWO.BufferGeometryUtils.mergeVertices(geometry)
                            geometry.computeVertexNormals()
                            // return geometry

                            meshes.push({
                                normal: geometry.attributes.normal.array,
                                positions:geometry.attributes.position.array,
                                uv:geometry.attributes.uv.array,
                                index:geometry.index.array,
                                matrix:paramsArray[i].matrix,
                                matrixWorld:paramsArray[i].matrixWorld,
                                name:paramsArray[i].name,
                                position:paramsArray[i].position,
                                up:paramsArray[i].up,
                            })

                            disposeNode(geometry)



}



return meshes

}


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


    function disposeNode (node)
    {
        if (node instanceof THREE.Mesh)
        {
            if (node.geometry)
            {
                node.geometry.dispose ();
            }
    
            if (node.material)
            {
                if (node.material instanceof THREE.MeshFaceMaterial)
                {
                    $.each (node.material.materials, function (idx, mtrl)
                    {
                        if (mtrl.map)               mtrl.map.dispose ();
                        if (mtrl.lightMap)          mtrl.lightMap.dispose ();
                        if (mtrl.bumpMap)           mtrl.bumpMap.dispose ();
                        if (mtrl.normalMap)         mtrl.normalMap.dispose ();
                        if (mtrl.specularMap)       mtrl.specularMap.dispose ();
                        if (mtrl.envMap)            mtrl.envMap.dispose ();
                        if (mtrl.alphaMap)          mtrl.alphaMap.dispose();
                        if (mtrl.aoMap)             mtrl.aoMap.dispose();
                        if (mtrl.displacementMap)   mtrl.displacementMap.dispose();
                        if (mtrl.emissiveMap)       mtrl.emissiveMap.dispose();
                        if (mtrl.gradientMap)       mtrl.gradientMap.dispose();
                        if (mtrl.metalnessMap)      mtrl.metalnessMap.dispose();
                        if (mtrl.roughnessMap)      mtrl.roughnessMap.dispose();
    
                        mtrl.dispose ();    // disposes any programs associated with the material
                    });
                }
                else
                {
                    if (node.material.map)              node.material.map.dispose ();
                    if (node.material.lightMap)         node.material.lightMap.dispose ();
                    if (node.material.bumpMap)          node.material.bumpMap.dispose ();
                    if (node.material.normalMap)        node.material.normalMap.dispose ();
                    if (node.material.specularMap)      node.material.specularMap.dispose ();
                    if (node.material.envMap)           node.material.envMap.dispose ();
                    if (node.material.alphaMap)         node.material.alphaMap.dispose();
                    if (node.material.aoMap)            node.material.aoMap.dispose();
                    if (node.material.displacementMap)  node.material.displacementMap.dispose();
                    if (node.material.emissiveMap)      node.material.emissiveMap.dispose();
                    if (node.material.gradientMap)      node.material.gradientMap.dispose();
                    if (node.material.metalnessMap)     node.material.metalnessMap.dispose();
                    if (node.material.roughnessMap)     node.material.roughnessMap.dispose();
    
                    node.material.dispose ();   // disposes any programs associated with the material
                }
            }
        }
    }   // disposeNode
    
    function disposeHierarchy (node, callback)
    {
        for (var i = node.children.length - 1; i >= 0; i--)
        {
            var child = node.children[i];
            disposeHierarchy (child, callback);
            callback (child);
        }
    }




    function mergeBufferAttributes( attributes ) {

        let TypedArray;
        let itemSize;
        let normalized;
        let arrayLength = 0;
    
        for ( let i = 0; i < attributes.length; ++ i ) {
    
            const attribute = attributes[ i ];
    
            if ( attribute.isInterleavedBufferAttribute ) {
    
                console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. InterleavedBufferAttributes are not supported.' );
                return null;
    
            }
    
            if ( TypedArray === undefined ) TypedArray = attribute.array.constructor;
            if ( TypedArray !== attribute.array.constructor ) {
    
                console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.' );
                return null;
    
            }
    
            if ( itemSize === undefined ) itemSize = attribute.itemSize;
            if ( itemSize !== attribute.itemSize ) {
    
                console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.' );
                return null;
    
            }
    
            if ( normalized === undefined ) normalized = attribute.normalized;
            if ( normalized !== attribute.normalized ) {
    
                console.error( 'THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.' );
                return null;
    
            }
    
            arrayLength += attribute.array.length;
    
        }
    
        const array = new TypedArray( arrayLength );
        let offset = 0;
    
        for ( let i = 0; i < attributes.length; ++ i ) {
    
            array.set( attributes[ i ].array, offset );
    
            offset += attributes[ i ].array.length;
    
        }
    
        return new THREE.BufferAttribute( array, itemSize, normalized );
    
    }


    function mergeBufferGeometries( geometries, useGroups = false ) {

        const isIndexed = geometries[ 0 ].index !== null;
    
        const attributesUsed = new Set( Object.keys( geometries[ 0 ].attributes ) );
        const morphAttributesUsed = new Set( Object.keys( geometries[ 0 ].morphAttributes ) );
    
        const attributes = {};
        const morphAttributes = {};
    
        const morphTargetsRelative = geometries[ 0 ].morphTargetsRelative;
    
        const mergedGeometry = new THREE.BufferGeometry();
    
        let offset = 0;
    
        for ( let i = 0; i < geometries.length; ++ i ) {
    
            const geometry = geometries[ i ];
            let attributesCount = 0;
    
            // ensure that all geometries are indexed, or none
    
            if ( isIndexed !== ( geometry.index !== null ) ) {
    
                console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.' );
                return null;
    
            }
    
            // gather attributes, exit early if they're different
    
            for ( const name in geometry.attributes ) {
    
                if ( ! attributesUsed.has( name ) ) {
    
                    console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure "' + name + '" attribute exists among all geometries, or in none of them.' );
                    return null;
    
                }
    
                if ( attributes[ name ] === undefined ) attributes[ name ] = [];
    
                attributes[ name ].push( geometry.attributes[ name ] );
    
                attributesCount ++;
    
            }
    
            // ensure geometries have the same number of attributes
    
            if ( attributesCount !== attributesUsed.size ) {
    
                console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. Make sure all geometries have the same number of attributes.' );
                return null;
    
            }
    
            // gather morph attributes, exit early if they're different
    
            if ( morphTargetsRelative !== geometry.morphTargetsRelative ) {
    
                console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. .morphTargetsRelative must be consistent throughout all geometries.' );
                return null;
    
            }
    
            for ( const name in geometry.morphAttributes ) {
    
                if ( ! morphAttributesUsed.has( name ) ) {
    
                    console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '.  .morphAttributes must be consistent throughout all geometries.' );
                    return null;
    
                }
    
                if ( morphAttributes[ name ] === undefined ) morphAttributes[ name ] = [];
    
                morphAttributes[ name ].push( geometry.morphAttributes[ name ] );
    
            }
    
            if ( useGroups ) {
    
                let count;
    
                if ( isIndexed ) {
    
                    count = geometry.index.count;
    
                } else if ( geometry.attributes.position !== undefined ) {
    
                    count = geometry.attributes.position.count;
    
                } else {
    
                    console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index ' + i + '. The geometry must have either an index or a position attribute' );
                    return null;
    
                }
    
                mergedGeometry.addGroup( offset, count, i );
    
                offset += count;
    
            }
    
        }
    
        // merge indices
    
        if ( isIndexed ) {
    
            let indexOffset = 0;
            const mergedIndex = [];
    
            for ( let i = 0; i < geometries.length; ++ i ) {
    
                const index = geometries[ i ].index;
    
                for ( let j = 0; j < index.count; ++ j ) {
    
                    mergedIndex.push( index.getX( j ) + indexOffset );
    
                }
    
                indexOffset += geometries[ i ].attributes.position.count;
    
            }
    
            mergedGeometry.setIndex( mergedIndex );
    
        }
    
        // merge attributes
    
        for ( const name in attributes ) {
    
            const mergedAttribute = mergeBufferAttributes( attributes[ name ] );
    
            if ( ! mergedAttribute ) {
    
                console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the ' + name + ' attribute.' );
                return null;
    
            }
    
            mergedGeometry.setAttribute( name, mergedAttribute );
    
        }
    
        // merge morph attributes
    
        for ( const name in morphAttributes ) {
    
            const numMorphTargets = morphAttributes[ name ][ 0 ].length;
    
            if ( numMorphTargets === 0 ) break;
    
            mergedGeometry.morphAttributes = mergedGeometry.morphAttributes || {};
            mergedGeometry.morphAttributes[ name ] = [];
    
            for ( let i = 0; i < numMorphTargets; ++ i ) {
    
                const morphAttributesToMerge = [];
    
                for ( let j = 0; j < morphAttributes[ name ].length; ++ j ) {
    
                    morphAttributesToMerge.push( morphAttributes[ name ][ j ][ i ] );
    
                }
    
                const mergedMorphAttribute = mergeBufferAttributes( morphAttributesToMerge );
    
                if ( ! mergedMorphAttribute ) {
    
                    console.error( 'THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the ' + name + ' morphAttribute.' );
                    return null;
    
                }
    
                mergedGeometry.morphAttributes[ name ].push( mergedMorphAttribute );
    
            }
    
        }
    
        return mergedGeometry;
    
    }
 
                             //materialSettings         //dotsSettings
function generateDots(mesh, settings, paramChoice, randoms, nonIndexed){

  // console.log("DOTRANDOMS123", index)
  console.log("DOTRANDOMS123", randoms[0][0])

let meshMaterial = new THREE.MeshBasicMaterial({color: "white"})

    // console.log("SETTINGS", settings)



//COLOR GUIDANCE:
//settings.color3 is the accent color, it is NOT present already on the flower.
//settings.color1 is the first gradient color
//settings.color2 is the second gradient color


   let colorChoiceArray = [ settings.color3Prod, settings.color1Prod, settings.color2Prod ]
   let colorChoice = colorChoiceArray[Math.floor(randoms[randoms.length-1]*colorChoiceArray.length)];
   let dotMaterial = new THREE.MeshPhysicalMaterial({color:new THREE.Color(colorChoice), side:THREE.DoubleSide})
   
//    dotMaterial.name = "dotMaterial" + fxrand()


//         const box = new THREE.Box3();
//         mesh.geometry.computeBoundingBox();
//         box.copy( mesh.geometry.boundingBox ).applyMatrix4( mesh.matrixWorld );
// console.log("BBOX", box)

            // let nonIndexed = mesh.geometry //.toNonIndexed()


// console.log(nonIndexed)


let clone = new THREE.Object3D()

let dotsNumber = paramChoice.dotNumber
let max = paramChoice.maxSize

let positions = []
let attempts = 0

for (var i=0; positions.length<dotsNumber; i++){
    if(i >= randoms.length-1){
        break
    }

let sphereContainer = new THREE.Object3D()


let randIndex = Math.floor(randoms[i][0]*(nonIndexed.attributes.position.array.length/3))
// console.log(randIndex)


let z = (nonIndexed.attributes.position.array[(randIndex*3)+2]+mesh.position.z)
let y  = (nonIndexed.attributes.position.array[(randIndex*3)+1]+mesh.position.y)
let x = (nonIndexed.attributes.position.array[(randIndex*3)]+mesh.position.x)

let rand = (randoms[i][1]/2)+0.3

//SPHERE IS A CYLINDER THAT INTERSECTS WITH THE FLOWER TO FORM THE DOTS
let height = 0.6 //1.8
let tooClose = false

for (var j=0; j<positions.length; j++){
    if(!tooClose){
 //calculate distance between x y z and all positions. If distance is less than or equal to height, break and return false
 let distance = Math.sqrt(Math.pow((positions[j][0]-x),2)+Math.pow((positions[j][1]-y),2)+Math.pow((positions[j][2]-z),2))
 if(distance <= (max*1.5)){
    tooClose = true
 }
} else {
    break
}
}

let containsLess = false

// AB=(x2−x1)2+(y2−y1)2+(z2−z1)2‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾√

if(!tooClose){




    // let sphere = new THREE.Mesh(new THREE.CylinderGeometry(
      
    //     rand*max, //radiustop //used to be 0.04
    //     rand*max,  //radiusbottom //used to be 0.04
    //     rand*max,  //height
    //     14, //radialsegments
    //     1, //heightsegments
    //     true //openEnded
    //     ), dotMaterial)

let sphere 

if(highResDots){

  let hrResolution = 40
if(hrDotResolution !== ""){
  console.log("DOTRESOLUTION", hrDotResolution)
  hrResolution = hrDotResolution
}

  sphere = new THREE.Mesh(new THREE.SphereGeometry(
    rand*max,  //radius
    hrResolution,//width segements
    2 //heightsegments

), dotMaterial)
} else {
  sphere = new THREE.Mesh(new THREE.SphereGeometry(
    rand*max,  //radius
    10,//width segements
    2 //heightsegments

), dotMaterial)
}


  
sphere.rotation.x = 90*(Math.PI/180)
sphereContainer.add(sphere)


createdGeometries.push(sphere)
createdGeometries.push(sphereContainer)


sphereContainer.lookAt(nonIndexed.attributes.normal.array[(randIndex*3)+0], 
nonIndexed.attributes.normal.array[(randIndex*3)+1], 
nonIndexed.attributes.normal.array[(randIndex*3)+2])

function getCenterPoint(mesh) {
    var bbox = new THREE.Box3().setFromObject(mesh);
    var middle = new THREE.Vector3();
    middle.x = (bbox.max.x + bbox.min.x) / 2;
    middle.y = (bbox.max.y + bbox.min.y) / 2;
    middle.z = (bbox.max.z + bbox.min.z) / 2;

    mesh.localToWorld( middle );
    return middle;
}



let center = getCenterPoint(sphereContainer)

    
    sphereContainer.position.z = z + center.z
    sphereContainer.position.y = y + center.y
    sphereContainer.position.x = x + center.x
    sphereContainer.updateMatrix();

    positions.push([x, y, z])

clone.add(sphereContainer)
}

// i++
}


let newmesh = new THREE.Object3D()


    let geoms=[]
    let meshes=[]
    clone.updateMatrixWorld(true,true)
    clone.traverse(e=>e.isMesh && meshes.push(e) &&  createdGeometries.push(e) &&(geoms.push(( e.geometry.index ) ? e.geometry.toNonIndexed() : e.geometry().clone())))
    geoms.forEach((g,i)=>g.applyMatrix4(meshes[i].matrixWorld));
    let gg = mergeBufferGeometries(geoms,true)
    gg.applyMatrix4(clone.matrix.clone().invert());
    gg.userData.materials = meshes.map(m=>m.material)

    clone.traverse(e=> {if (e.isMesh){
        // e.geometry.dispose()
        disposeHierarchy (e, disposeNode);
    }})

let sphere = new THREE.Mesh(gg, dotMaterial)
createdGeometries.push(sphere)
// console.log(gg)

geoms.forEach(geom => {
// geom.dispose()
disposeNode(geom)
})

meshes.forEach(mesh=>{
// mesh.geometry.dispose()
disposeHierarchy (mesh, disposeNode);
mesh = undefined
})

clone = undefined



    function doCSG(a,b,op,mat,mat1=mat){
    let bspA = CSG.fromGeometry( a.geometry, 0);
    let bspB = CSG.fromGeometry( b.geometry, 1);
    let bspC = bspA[op]( bspB );
    // console.log(bspC)

    bspA = undefined
    bspB = undefined

    let result = CSG.toMesh( bspC, a.matrix );
    bspC = undefined
    result.material = mat;
    // result.castShadow  = result.receiveShadow = true;

    return result;
    
}


// let before4 = Date.now()
// let newunion = doCSG(mesh,sphere,'newunion',meshMaterial)
// newunion.name = "flower"

//         let after4 = Date.now()
//         console.log("MAKEDOT", "NEWUNION", "TIME", after4 - before4)


        let before6 = Date.now()
let newintersect = doCSG(mesh,sphere,'newintersect',dotMaterial)
newintersect.name = "dots"
    let after6 = Date.now()
    // console.log("MAKEDOT","NEWINTERSECT", "TIME", after6 - before6)


    // sphere.geometry.dispose()
    disposeHierarchy (sphere, disposeNode);
sphere = undefined;
// mesh.geometry.dispose()
disposeHierarchy (mesh, disposeNode);
mesh = undefined;

        newmesh.add(newintersect)
        // newmesh.add(newunion)

  // }
  createdGeometries.push(newmesh)
  createdGeometries.push(newintersect)


        // console.log("GENERATEDOTS", mesh)

        return newmesh
       }

let highResDots = false
let hrDotResolution = 40

    function onMessage(e) { 



      if(e.data[0]=="makedot"){

        highResDots = e.data[1].geometry0data.highResDots

        hrDotResolution = e.data[1].geometry0data.hrDotResolution

        console.log("DOTRESOLUTION", hrDotResolution, highResDots)

// e.data[1].geometry0data.hrDotResolution


        console.log("highResDots!", highResDots)

        if(e.data[1].geometry0data.dotsSettings.nodots){



            if(e.data[1].flowerNum == 2){

                let parsedGeom = new THREE.BufferGeometry();
    
    
                let normals = e.data[1].geometry0data.normal
                let positions = e.data[1].geometry0data.positions
                let uvs = e.data[1].geometry0data.uv
                let indices = e.data[1].geometry0data.index
                let matrix = e.data[1].geometry0data.matrix
                let matrixWorld = e.data[1].geometry0data.matrixWorld
                // let color = e.data[0].color[0]
                
                // console.log(parsedGeom)
                let normalBuffer = new THREE.BufferAttribute(normals, 3)
                // createdGeometries.push(normalBuffer)
                parsedGeom.attributes.normal= normalBuffer
                parsedGeom.attributes.normal.needsUpdate = true
                // console.log(parsedGeom)
                
                let positionsFloat = new Float32Array(positions)
                // createdGeometries.push(positionsFloat)
                let positionsFloatBuffer = new THREE.BufferAttribute(positionsFloat, 3)
                // createdGeometries.push(positionsFloatBuffer)
                parsedGeom.attributes.position= positionsFloatBuffer
                parsedGeom.attributes.position.needsUpdate = true
                
                // parsedGeom.attributes.color = new THREE.BufferAttribute(color, 3)
                // parsedGeom.attributes.color.needsUpdate = true
                
                // parsedGeom.attributes.color = []
                // parsedGeom.attributes.color.needsUpdate = true
                
                let uvsBufferAttribute = new THREE.BufferAttribute(uvs, 2)
                // createdGeometries.push(uvsBufferAttribute)
                parsedGeom.attributes.uv= uvsBufferAttribute
                parsedGeom.attributes.uv.needsUpdate = true
                let indicdesBufferAttribute = new THREE.BufferAttribute(indices, 1)
                // createdGeometries.push(indicdesBufferAttribute)
                parsedGeom.index = indicdesBufferAttribute
                parsedGeom.index.needsUpdate = true
                parsedGeom.needsUpdate = true;
            
                let matrixA = new THREE.Matrix4()
                matrixA.set(matrix)
                // createdGeometries.push(matrixA)
            
                let matrixW = new THREE.Matrix4()
                matrixW.set(matrixWorld)
                // createdGeometries.push(matrixW)
            
                parsedGeom.matrix = matrixA
                parsedGeom.matrixWorld = matrixW
            
                // parsedGeom.applyMatrix4(matrix)
                
                  // console.log("PARSED", e.data[0])
                  // console.log("PARSED", parsedGeom)
                
                
                
                  parsedGeom.computeBoundingBox()
                  let mesh = new THREE.Mesh(parsedGeom, new THREE.MeshBasicMaterial({color:"white"}))


                  let parsedGeom1 = new THREE.BufferGeometry();
                  // createdGeometries.push(parsedGeom1)
                      
                  let normals1 = e.data[1].geometry1data.normal
                  let positions1 = e.data[1].geometry1data.positions
                  let uvs1 = e.data[1].geometry1data.uv
                  let indices1 = e.data[1].geometry1data.index
                  let matrix1 = e.data[1].geometry1data.matrix
                  let matrixWorld1 = e.data[1].geometry1data.matrixWorld
                  // let color = e.data[0].color[0]
                  
                  // console.log(parsedGeom1)
                  let normals1BA = new THREE.BufferAttribute(normals1, 3)
                  // createdGeometries.push(normals1BA)
                  parsedGeom1.attributes.normal= normals1BA
                  parsedGeom1.attributes.normal.needsUpdate = true
                  // console.log(parsedGeom1)
                  
                  let positionsFloat1 = new Float32Array(positions1)
                  // createdGeometries.push(positionsFloat1)
                  let positionsFloatBA = new THREE.BufferAttribute(positionsFloat1, 3)
                  // createdGeometries.push(positionsFloatBA)
                  parsedGeom1.attributes.position= positionsFloatBA
                  parsedGeom1.attributes.position.needsUpdate = true
                  
                  // parsedGeom1.attributes.color = new THREE.BufferAttribute(color, 3)
                  // parsedGeom1.attributes.color.needsUpdate = true
                  
                  // parsedGeom1.attributes.color = []
                  // parsedGeom1.attributes.color.needsUpdate = true
                  
                  let uvs1BA = new THREE.BufferAttribute(uvs1, 2)
                  // createdGeometries.push(uvs1BA)
                  parsedGeom1.attributes.uv= uvs1BA
                  parsedGeom1.attributes.uv.needsUpdate = true
                  let indices1BA = new THREE.BufferAttribute(indices1,1 )
                  // createdGeometries.push(indices1BA)
                  parsedGeom1.index = indices1BA
                  parsedGeom1.index.needsUpdate = true
                  parsedGeom1.needsUpdate = true;
                  
                  let matrixA1 = new THREE.Matrix4()
                  matrixA.set(matrix1)
                  // createdGeometries.push(matrixA1)
                  
                  let matrixW1 = new THREE.Matrix4()
                  matrixW.set(matrixWorld1)
                  // createdGeometries.push(matrixWorld1)
                  
                  parsedGeom1.matrix = matrixA1
                  parsedGeom1.matrixWorld = matrixW1
                  
                  // parsedGeom1.applyMatrix4(matrix)
                  
                    // console.log("PARSED", e.data[0])
                    // console.log("PARSED", parsedGeom1)
                  
                  
                  
                    parsedGeom1.computeBoundingBox()
                  
                    let mesh1 = new THREE.Mesh(parsedGeom1, new THREE.MeshBasicMaterial({color:"white"}))
                  //   mesh1.position.set(e.data[1].geometry1data.position)





                let simplified = simplifyMessage([{
                    normal: mesh.geometry.attributes.normal.array,
                    positions:mesh.geometry.attributes.position.array,
                    uv:mesh.geometry.attributes.uv.array,
                    index:mesh.geometry.index.array,
                    matrix:mesh.matrix.elements,
                    matrixWorld:mesh.matrixWorld.elements,
                    name:mesh.name,
                    position:e.data[1].geometry0data.position,
                    up:mesh.up,
                },  {
                    normal: mesh1.geometry.attributes.normal.array,
                    positions:mesh1.geometry.attributes.position.array,
                    uv:mesh1.geometry.attributes.uv.array,
                    index:mesh1.geometry.index.array,
                    matrix:mesh1.matrix.elements,
                    matrixWorld:mesh1.matrixWorld.elements,
                    name:mesh1.name,
                    position:e.data[1].geometry1data.position,
                    up:mesh1.up,
                }])
                
                simplified[0].normal = new THREE.BufferAttribute( new Float32Array([0,0,0]), 3 )
                simplified[0].positions= new THREE.BufferAttribute( new Float32Array([0,0,0]), 3 )
                simplified[0].uv = new THREE.BufferAttribute( new Float32Array([0,0]), 2 )
                simplified[0].index = new THREE.BufferAttribute( new Float32Array([0]), 1 )


                simplified[1].normal = new THREE.BufferAttribute( new Float32Array([0,0,0]), 3 )
                simplified[1].positions= new THREE.BufferAttribute( new Float32Array([0,0,0]), 3 )
                simplified[1].uv = new THREE.BufferAttribute( new Float32Array([0,0]), 2 )
                simplified[1].index = new THREE.BufferAttribute( new Float32Array([0]), 1 )
                
                postMessage(
                    
                    [
                    {
                    dot1Dots:simplified[0],
                    dot2Dots:simplified[1],
                    flowerNum: e.data[1].flowerNum, 
                    flowerIndex: e.data[1].index,
                    workerNum: e.data[1].workerNum,
                    noDots:true
                        }
                
                ] 
                    
                    ); //add to worker B) //don't use .toNonIndexed()

            } else if(e.data[1].flowerNum == 1){



                let parsedGeom = new THREE.BufferGeometry();
    
    
                let normals = e.data[1].geometry0data.normal
                let positions = e.data[1].geometry0data.positions
                let uvs = e.data[1].geometry0data.uv
                let indices = e.data[1].geometry0data.index
                let matrix = e.data[1].geometry0data.matrix
                let matrixWorld = e.data[1].geometry0data.matrixWorld
                // let color = e.data[0].color[0]
                
                // console.log(parsedGeom)
                let normalBuffer = new THREE.BufferAttribute(normals, 3)
                // createdGeometries.push(normalBuffer)
                parsedGeom.attributes.normal= normalBuffer
                parsedGeom.attributes.normal.needsUpdate = true
                // console.log(parsedGeom)
                
                let positionsFloat = new Float32Array(positions)
                // createdGeometries.push(positionsFloat)
                let positionsFloatBuffer = new THREE.BufferAttribute(positionsFloat, 3)
                // createdGeometries.push(positionsFloatBuffer)
                parsedGeom.attributes.position= positionsFloatBuffer
                parsedGeom.attributes.position.needsUpdate = true
                
                // parsedGeom.attributes.color = new THREE.BufferAttribute(color, 3)
                // parsedGeom.attributes.color.needsUpdate = true
                
                // parsedGeom.attributes.color = []
                // parsedGeom.attributes.color.needsUpdate = true
                
                let uvsBufferAttribute = new THREE.BufferAttribute(uvs, 2)
                // createdGeometries.push(uvsBufferAttribute)
                parsedGeom.attributes.uv= uvsBufferAttribute
                parsedGeom.attributes.uv.needsUpdate = true
                let indicdesBufferAttribute = new THREE.BufferAttribute(indices, 1)
                // createdGeometries.push(indicdesBufferAttribute)
                parsedGeom.index = indicdesBufferAttribute
                parsedGeom.index.needsUpdate = true
                parsedGeom.needsUpdate = true;
            
                let matrixA = new THREE.Matrix4()
                matrixA.set(matrix)
                // createdGeometries.push(matrixA)
            
                let matrixW = new THREE.Matrix4()
                matrixW.set(matrixWorld)
                // createdGeometries.push(matrixW)
            
                parsedGeom.matrix = matrixA
                parsedGeom.matrixWorld = matrixW
            
                // parsedGeom.applyMatrix4(matrix)
                
                  // console.log("PARSED", e.data[0])
                  // console.log("PARSED", parsedGeom)
                
                
                
                  parsedGeom.computeBoundingBox()
                  let mesh = new THREE.Mesh(parsedGeom, new THREE.MeshBasicMaterial({color:"white"}))



                let simplified = simplifyMessage([{
                    normal: mesh.geometry.attributes.normal.array,
                    positions:mesh.geometry.attributes.position.array,
                    uv:mesh.geometry.attributes.uv.array,
                    index:mesh.geometry.index.array,
                    matrix:mesh.matrix.elements,
                    matrixWorld:mesh.matrixWorld.elements,
                    name:mesh.name,
                    position:e.data[1].geometry0data.position,
                    up:mesh.up,
                }])
                
                
                // normal: geometry.attributes.normal.array,
                // positions:geometry.attributes.position.array,
                // uv:geometry.attributes.uv.array,
                // index:geometry.index.array,
                // matrix:paramsArray[i].matrix,
                // matrixWorld:paramsArray[i].matrixWorld,
                // name:paramsArray[i].name,
                // position:paramsArray[i].position,
                // up:paramsArray[i].up,
                
                simplified[0].normal = new THREE.BufferAttribute( new Float32Array([0,0,0]), 3 )
                simplified[0].positions= new THREE.BufferAttribute( new Float32Array([0,0,0]), 3 )
                simplified[0].uv = new THREE.BufferAttribute( new Float32Array([0,0]), 2 )
                simplified[0].index = new THREE.BufferAttribute( new Float32Array([0]), 1 )

                postMessage(
                    
                    [
                    {dot1Dots:simplified[0],
                            flowerNum: e.data[1].flowerNum, 
                            flowerIndex: e.data[1].index,
                            workerNum: e.data[1].workerNum,
                            noDots:true
                    }])

            }

            // console.log("NODOTS")
        
        } else {




if(e.data[1].flowerNum == 2){


    let parsedGeom = new THREE.BufferGeometry();
    
    
    let normals = e.data[1].geometry0data.normal
    let positions = e.data[1].geometry0data.positions
    let uvs = e.data[1].geometry0data.uv
    let indices = e.data[1].geometry0data.index
    let matrix = e.data[1].geometry0data.matrix
    let matrixWorld = e.data[1].geometry0data.matrixWorld
    // let color = e.data[0].color[0]
    
    // console.log(parsedGeom)
    parsedGeom.attributes.normal= new THREE.BufferAttribute( normals, 3 )
    parsedGeom.attributes.normal.needsUpdate = true
    // console.log(parsedGeom)
    
    let positionsFloat = new Float32Array(positions)
    parsedGeom.attributes.position= new THREE.BufferAttribute( positionsFloat, 3 )
    parsedGeom.attributes.position.needsUpdate = true
    
    // parsedGeom.attributes.color = new THREE.BufferAttribute(color, 3)
    // parsedGeom.attributes.color.needsUpdate = true
    
    // parsedGeom.attributes.color = []
    // parsedGeom.attributes.color.needsUpdate = true
    
    
    parsedGeom.attributes.uv= new THREE.BufferAttribute( uvs, 2 )
    parsedGeom.attributes.uv.needsUpdate = true
    parsedGeom.index = new THREE.BufferAttribute( indices, 1 )
    parsedGeom.index.needsUpdate = true
    parsedGeom.needsUpdate = true;

    let matrixA = new THREE.Matrix4()
    matrixA.set(matrix)

    let matrixW = new THREE.Matrix4()
    matrixW.set(matrixWorld)

    parsedGeom.matrix = matrixA
    parsedGeom.matrixWorld = matrixW

    // parsedGeom.applyMatrix4(matrix)
    
      // console.log("PARSED", e.data[0])
      // console.log("PARSED", parsedGeom)
    
    
    
      parsedGeom.computeBoundingBox()

      let mesh = new THREE.Mesh(parsedGeom, new THREE.MeshBasicMaterial({color:"white"}))
    //   mesh.position.set(e.data[1].geometry0data.position.x,e.data[1].geometry0data.position.y, e.data[1].geometry0data.position.z)
    createdGeometries.push(mesh)
    let dots = generateDots(mesh, e.data[1].geometry0data.materialSettings, e.data[1].geometry0data.dotsSettings, e.data[1].geometry0data.randoms, e.data[1].geometry0data.nonIndexed)
    createdGeometries.push(dots)
    disposeHierarchy (mesh, disposeNode);
    // mesh.geometry.dispose()

// console.log("MAKEDOT", "1/2", dots)




let parsedGeom1 = new THREE.BufferGeometry();
    
    
let normals1 = e.data[1].geometry1data.normal
let positions1 = e.data[1].geometry1data.positions
let uvs1 = e.data[1].geometry1data.uv
let indices1 = e.data[1].geometry1data.index
let matrix1 = e.data[1].geometry1data.matrix
let matrixWorld1 = e.data[1].geometry1data.matrixWorld
// let color = e.data[0].color[0]

// console.log(parsedGeom1)
parsedGeom1.attributes.normal= new THREE.BufferAttribute( normals1, 3 )
parsedGeom1.attributes.normal.needsUpdate = true
// console.log(parsedGeom1)

let positionsFloat1 = new Float32Array(positions1)
parsedGeom1.attributes.position= new THREE.BufferAttribute( positionsFloat1, 3 )
parsedGeom1.attributes.position.needsUpdate = true

// parsedGeom1.attributes.color = new THREE.BufferAttribute(color, 3)
// parsedGeom1.attributes.color.needsUpdate = true

// parsedGeom1.attributes.color = []
// parsedGeom1.attributes.color.needsUpdate = true


parsedGeom1.attributes.uv= new THREE.BufferAttribute( uvs1, 2 )
parsedGeom1.attributes.uv.needsUpdate = true
parsedGeom1.index = new THREE.BufferAttribute( indices1, 1 )
parsedGeom1.index.needsUpdate = true
parsedGeom1.needsUpdate = true;

let matrixA1 = new THREE.Matrix4()
matrixA.set(matrix1)

let matrixW1 = new THREE.Matrix4()
matrixW.set(matrixWorld1)

parsedGeom1.matrix = matrixA1
parsedGeom1.matrixWorld = matrixW1

// parsedGeom1.applyMatrix4(matrix)

  // console.log("PARSED", e.data[0])
  // console.log("PARSED", parsedGeom1)



  parsedGeom1.computeBoundingBox()

  let mesh1 = new THREE.Mesh(parsedGeom1, new THREE.MeshBasicMaterial({color:"white"}))
//   mesh1.position.set(e.data[1].geometry1data.position.x,e.data[1].geometry1data.position.y, e.data[1].geometry1data.position.z)

let dots1 = generateDots(mesh1, e.data[1].geometry1data.materialSettings, e.data[1].geometry1data.dotsSettings, e.data[1].geometry1data.randoms, e.data[1].geometry1data.nonIndexed)
createdGeometries.push(parsedGeom1)
createdGeometries.push(dots1)
parsedGeom1 = undefined
// console.log("MAKEDOT", "2/2", dots1)

// mesh1.geometry.dispose()
disposeHierarchy (mesh1, disposeNode);
// if(false){

//post message with FOUR geometries in it, one for the dots, one for the flower
//geometries are named, "flower" and "dots"

let simplified = simplifyMessage([
    {
        normal: dots.children[0].geometry.attributes.normal.array,
        positions:dots.children[0].geometry.attributes.position.array,
        uv:dots.children[0].geometry.attributes.uv.array,
        index:dots.children[0].geometry.index.array,
        matrix:dots.children[0].matrix.elements,
        matrixWorld:dots.children[0].matrixWorld.elements,
        name:dots.children[0].name,
        position:e.data[1].geometry0data.position,
        up:dots.children[0].up,
    },
    {
        normal: dots1.children[0].geometry.attributes.normal.array,
        positions:dots1.children[0].geometry.attributes.position.array,
        uv:dots1.children[0].geometry.attributes.uv.array,
        index:dots1.children[0].geometry.index.array,
        matrix:dots1.children[0].matrix.elements,
        matrixWorld:dots1.children[0].matrixWorld.elements,
        name:dots1.children[0].name,
        position:e.data[1].geometry1data.position,
        up:dots1.children[0].up,
    }
])

postMessage(
    
    [{
    // {dot1Flower:{
    //     normal: dots.children[1].geometry.attributes.normal.array,
    //     positions:dots.children[1].geometry.attributes.position.array,
    //     uv:dots.children[1].geometry.attributes.uv.array,
    //     index:dots.children[1].geometry.index.array,
    //     matrix:dots.children[1].matrix.elements,
    //     matrixWorld:dots.children[1].matrixWorld.elements,
    //     name:dots.children[1].name,
    //     position:dots.children[1].position,
    //     up:dots.children[1].up,
    // },
    dot1Dots:simplified[0],
    // dot2Flower:{
    //     normal: dots1.children[1].geometry.attributes.normal.array,
    //     positions:dots1.children[1].geometry.attributes.position.array,
    //     uv:dots1.children[1].geometry.attributes.uv.array,
    //     index:dots1.children[1].geometry.index.array,
    //     matrix:dots1.children[1].matrix.elements,
    //     matrixWorld:dots1.children[1].matrixWorld.elements,
    //     name:dots1.children[1].name,
    //     position:dots1.children[1].position,
    //     up:dots1.children[1].up,
    // },
    dot2Dots:simplified[1], 

    flowerNum: e.data[1].flowerNum, 
    flowerIndex: e.data[1].index,
    workerNum: e.data[1].workerNum
        }

] 
    
    ); //add to worker B) //don't use .toNonIndexed()
   
    for (var i=0; i< createdGeometries.length; i++){
        createdGeometries[i]=undefined
    }

    // console.log(dots)
    dots.children[0].geometry.dispose()
    // dots1.children[0].geometry.dispose()
    // parsedGeom1.dispose()
    // parsedGeom.dispose()
    disposeHierarchy (dots.children[0], disposeNode);
    disposeHierarchy (dots1.children[0], disposeNode);
    disposeNode(parsedGeom1)
    disposeNode(parsedGeom)
    mesh = 0
    mesh1 = 0

// }



    // console.log("MAKEDOT", 2)

} else if(e.data[1].flowerNum == 1){


    let parsedGeom = new THREE.BufferGeometry();
    
    
    let normals = e.data[1].geometry0data.normal
    let positions = e.data[1].geometry0data.positions
    let uvs = e.data[1].geometry0data.uv
    let indices = e.data[1].geometry0data.index
    let matrix = e.data[1].geometry0data.matrix
    let matrixWorld = e.data[1].geometry0data.matrixWorld
    // let color = e.data[0].color[0]
    
    // console.log(parsedGeom)
    parsedGeom.attributes.normal= new THREE.BufferAttribute( normals, 3 )
    parsedGeom.attributes.normal.needsUpdate = true
    // console.log(parsedGeom)
    
    let positionsFloat = new Float32Array(positions)
    parsedGeom.attributes.position= new THREE.BufferAttribute( positionsFloat, 3 )
    parsedGeom.attributes.position.needsUpdate = true
    
    // parsedGeom.attributes.color = new THREE.BufferAttribute(color, 3)
    // parsedGeom.attributes.color.needsUpdate = true
    
    // parsedGeom.attributes.color = []
    // parsedGeom.attributes.color.needsUpdate = true
    
    
    parsedGeom.attributes.uv= new THREE.BufferAttribute( uvs, 2 )
    parsedGeom.attributes.uv.needsUpdate = true
    parsedGeom.index = new THREE.BufferAttribute( indices, 1 )
    parsedGeom.index.needsUpdate = true
    parsedGeom.needsUpdate = true;

    let matrixA = new THREE.Matrix4()
    matrixA.set(matrix)

    let matrixW = new THREE.Matrix4()
    matrixW.set(matrixWorld)

    parsedGeom.matrix = matrixA
    parsedGeom.matrixWorld = matrixW

    // parsedGeom.applyMatrix4(matrix)
    
      // console.log("PARSED", e.data[0])
      // console.log("PARSED", parsedGeom)
    
    
    
      parsedGeom.computeBoundingBox()

      let mesh = new THREE.Mesh(parsedGeom, new THREE.MeshBasicMaterial({color:"white"}))
    //   mesh.position.set(e.data[1].geometry0data.position.x,e.data[1].geometry0data.position.y, e.data[1].geometry0data.position.z)
    createdGeometries.push(mesh)
    let dots = generateDots(mesh, e.data[1].geometry0data.materialSettings, e.data[1].geometry0data.dotsSettings, e.data[1].geometry0data.randoms, e.data[1].geometry0data.nonIndexed)
    createdGeometries.push(dots)
// console.log("MAKEDOT", "1/1", dots)
// mesh.geometry.dispose()
disposeHierarchy (mesh, disposeNode);
// if(false){
//post message with two geometries in it, one for the dots, one for the flower
//geometries are named, "flower" and "dots"


let simplified = simplifyMessage([
    {
        normal: dots.children[0].geometry.attributes.normal.array,
        positions:dots.children[0].geometry.attributes.position.array,
        uv:dots.children[0].geometry.attributes.uv.array,
        index:dots.children[0].geometry.index.array,
        matrix:dots.children[0].matrix.elements,
        matrixWorld:dots.children[0].matrixWorld.elements,
        name:dots.children[0].name,
        position:e.data[1].geometry0data.position,
        up:dots.children[0].up,
    }
])

disposeNode(dots)

postMessage(
    
    [
    {
    //     dot1Flower:{
    //     normal: dots.children[1].geometry.attributes.normal.array,
    //     positions:dots.children[1].geometry.attributes.position.array,
    //     uv:dots.children[1].geometry.attributes.uv.array,
    //     index:dots.children[1].geometry.index.array,
    //     matrix:dots.children[1].matrix.elements,
    //     matrixWorld:dots.children[1].matrixWorld.elements,
    //     name:dots.children[1].name,
    //     position:dots.children[1].position,
    //     up:dots.children[1].up,
    // },
    dot1Dots:simplified[0],
            
            
            flowerNum: e.data[1].flowerNum, 
            flowerIndex: e.data[1].index,
            workerNum: e.data[1].workerNum
    }]
            
            
            ); //add to worker B) //don't use .toNonIndexed()

for (var i=0; i< createdGeometries.length; i++){
    createdGeometries[i]=undefined
}

            // dots.children[0].geometry.dispose()
            disposeHierarchy (dots.children[0], disposeNode);
            // dots1.children[0].dispose()
            // parsedGeom1.dispose()
            disposeNode(parsedGeom)
            // parsedGeom.dispose()
            mesh = undefined
            // mesh1 = 0

        //    }

    // console.log("MAKEDOT", 1)

}

//build the meshes and set 





        // if(e.data[5]==0){
        //   console.log("WORKER 0")
        //   return;
        // }


        // if(e.data[6] == "is2Layer"){


        //     postMessage( [{color: [optimizedMessage.attributes.color.array], 
        //         normal: [optimizedMessage.attributes.normal.array], 
        //         position: [optimizedMessage.attributes.position.array], 
        //         uv:[optimizedMessage.attributes.uv.array], 
        //         index:[optimizedMessage.index.array]}, 
        //         e.data[1], 
        //         e.data[5], 
        //         {color: [optimizedMessage2.attributes.color.array], 
        //         normal: [optimizedMessage2.attributes.normal.array], 
        //         position: [optimizedMessage2.attributes.position.array], 
        //         uv:[optimizedMessage2.attributes.uv.array], 
        //         index:[optimizedMessage2.index.array]}] ); //add to worker B) //don't use .toNonIndexed()
        //  } else {
        //   // console.log(message)
        //   // console.log("OPTIMIZED", "posting message2")
        //    postMessage( [{color: [optimizedMessage.attributes.color.array], 
        //     normal: [optimizedMessage.attributes.normal.array], 
        //     position: [optimizedMessage.attributes.position.array], 
        //     uv:[optimizedMessage.attributes.uv.array], 
        //     index:[optimizedMessage.index.array]}, 
        //     e.data[1], 
        //     e.data[5]] ); //add to worker B) //don't use .toNonIndexed()



        //  }




}
    }
}
// }