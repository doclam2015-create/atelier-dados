import * as THREE from 'three';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';

// An inset convex core swept by a small sphere: planar faces, curved edges
// and rounded corners. The original supporting planes stay in place.
export function roundedGeometry(data, radius, segments = 4) {
  const inradius = Math.min(...data.faces.map(f => f.normal.dot(f.center)));
  const coreScale = 1 - radius / inradius;
  const points = [], normals = new Map();
  const key = p => p.toArray().map(v => v.toFixed(6)).join(',');
  const add = (core, n) => {
    const normal = n.clone().normalize();
    const p = core.clone().addScaledVector(normal, radius);
    const id = key(p);
    if (!normals.has(id)) { points.push(p); normals.set(id, normal); }
  };
  data.vertices.forEach((vertex, index) => {
    const core = vertex.clone().multiplyScalar(coreScale);
    const neighbors = data.faces.filter(f => f.indices.includes(index)).map(f => f.normal);
    const axis = vertex.clone().normalize();
    const u = neighbors[0].clone().addScaledVector(axis, -neighbors[0].dot(axis)).normalize();
    const v = axis.clone().cross(u);
    neighbors.sort((a,b) => Math.atan2(a.dot(v),a.dot(u))-Math.atan2(b.dot(v),b.dot(u)));
    const center = neighbors.reduce((sum,n)=>sum.add(n),new THREE.Vector3()).normalize();
    for(let edge=0;edge<neighbors.length;edge++) {
      const a=neighbors[edge], b=neighbors[(edge+1)%neighbors.length];
      for(let i=0;i<=segments;i++) for(let j=0;j<=segments-i;j++) {
        const n=center.clone().multiplyScalar(1-(i+j)/segments)
          .addScaledVector(a,i/segments).addScaledVector(b,j/segments);
        add(core,n);
      }
    }
  });
  const geometry = new ConvexGeometry(points);
  const p = geometry.attributes.position, n = geometry.attributes.normal;
  for(let i=0;i<p.count;i++) {
    const normal = normals.get(key(new THREE.Vector3().fromBufferAttribute(p,i)));
    if(normal) n.setXYZ(i,normal.x,normal.y,normal.z);
  }
  n.needsUpdate=true;
  // Only outline the flat face boundary, never the tessellation of the bevel.
  const borders=[];
  for(const face of data.faces) for(let i=0;i<face.indices.length;i++) {
    for(const id of [face.indices[i],face.indices[(i+1)%face.indices.length]]) {
      borders.push(...data.vertices[id].clone().multiplyScalar(coreScale)
        .addScaledVector(face.normal,radius+.0008).toArray());
    }
  }
  const borderGeometry=new THREE.BufferGeometry();
  borderGeometry.setAttribute('position',new THREE.Float32BufferAttribute(borders,3));
  return {geometry,borderGeometry};
}
