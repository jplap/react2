//import dataSession from "./dataSession";


class IDataSession {

    constructor() {
        console.log();
    }
    publish(){

    }
    refresh(){

    }

    init(opts) {


    }

    getBlocks() {

    }

    getBlock(bid) {

    }
    getTagsName(bid) {

    }
    getTagsRef(){

    }
    setTags(bid, tagArray){

    }
    addBlock( blockdata ){

    }
    removeBlock( bid ) {

    }
    removePart( bid, partId ) {

    }
    addPart( bid, part ) {

    }
    updatePart( bid, part ) {

    }
    getPartTypesRef(){

    }
    getBlockCategoriesRef(){

    }
    getBlockCategoriesImgRef ( category ){

    }
    commit(){

    }

    generateGuid() {
        var result, i, j;
        result = '';
        for(j=0; j<32; j++) {
            if( j === 8 || j === 12 || j === 16 || j === 20)
                result = result + '-';
            i = Math.floor(Math.random()*16).toString(16).toUpperCase();
            result = result + i;
        }
        return result;
    }

}

export default IDataSession;
//module.exports = IDataSession;