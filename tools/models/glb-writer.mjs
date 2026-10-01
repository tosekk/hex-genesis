/** Minimal deterministic glTF 2.0 writer: one static indexed mesh, one white material, no maps. */
export function writeGLB(geometry, name) {
  geometry.computeBoundingBox();
  const arrays = [geometry.getAttribute('position').array, geometry.getAttribute('normal').array,
    geometry.getAttribute('color').array, geometry.getAttribute('_EMIT').array, geometry.index.array];
  const views = [], chunks = []; let offset = 0;
  for (let i = 0; i < arrays.length; i++) {
    const array = arrays[i], bytes = Buffer.from(array.buffer, array.byteOffset, array.byteLength);
    views.push({buffer:0,byteOffset:offset,byteLength:bytes.length,target:i===4?34963:34962});
    chunks.push(bytes); offset+=bytes.length;
    const padding=(4-offset%4)%4; if(padding){chunks.push(Buffer.alloc(padding));offset+=padding;}
  }
  const count=geometry.getAttribute('position').count;
  const document={asset:{version:'2.0',generator:'Hex Genesis post-submission forest-core tool'},scene:0,scenes:[{nodes:[0]}],nodes:[{name,mesh:0}],
    meshes:[{name,primitives:[{attributes:{POSITION:0,NORMAL:1,COLOR_0:2,_EMIT:3},indices:4,material:0,mode:4}]}],
    materials:[{name:'vertex-colors-only',pbrMetallicRoughness:{baseColorFactor:[1,1,1,1],metallicFactor:0,roughnessFactor:1},alphaMode:'OPAQUE',doubleSided:false}],
    buffers:[{byteLength:offset}],bufferViews:views,accessors:[
      {bufferView:0,componentType:5126,count,type:'VEC3',min:geometry.boundingBox.min.toArray(),max:geometry.boundingBox.max.toArray()},
      {bufferView:1,componentType:5126,count,type:'VEC3'}, {bufferView:2,componentType:5126,count,type:'VEC4'},
      {bufferView:3,componentType:5126,count,type:'SCALAR'},
      {bufferView:4,componentType:arrays[4] instanceof Uint16Array?5123:5125,count:arrays[4].length,type:'SCALAR'},
    ]};
  const json=Buffer.from(JSON.stringify(document)), padded=Buffer.alloc((json.length+3)&~3,32); json.copy(padded);
  const binary=Buffer.concat(chunks), total=12+8+padded.length+8+binary.length, result=Buffer.alloc(total);
  result.writeUInt32LE(0x46546c67,0);result.writeUInt32LE(2,4);result.writeUInt32LE(total,8);
  result.writeUInt32LE(padded.length,12);result.writeUInt32LE(0x4e4f534a,16);padded.copy(result,20);
  result.writeUInt32LE(binary.length,20+padded.length);result.writeUInt32LE(0x004e4942,24+padded.length);binary.copy(result,28+padded.length);
  return result;
}
