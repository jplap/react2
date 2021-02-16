import dataBlocksFile from '../populateServer/blocksData.json';
import tagsRefFile from '../populateServer/tagsReference.json';
import typeRefFile from '../populateServer/partTypeReference.json';
import categoryRefFile from '../populateServer/blockCategoriesReference.json';
import IProxy from "./IProxy";

var PREFIX_INFO = "proxyFile:INFO: ";
//var PREFIX_ERROR = "proxyFile:ERROR: "

class proxyFile extends IProxy {

    constructor(props) {
        super(props)
        console.log(PREFIX_INFO + "constructor");


    }
    init() {
        console.log(PREFIX_INFO + "init");
        return new Promise((resolve, reject) => {
            this.dataBlocks = dataBlocksFile;
            this.tagsRefFile = tagsRefFile;
            this.typeRefFile = typeRefFile;
            this.categoryRefFile = categoryRefFile;

            this.dataFile = [];
            this.dataFile.push({type: "datas", data: this.dataBlocks})
            this.dataFile.push({type: "tags", data: this.tagsRefFile})
            this.dataFile.push({type: "parttypes", data: this.typeRefFile})
            this.dataFile.push({type: "categories", data: this.categoryRefFile});
            resolve();
        })
    }


    publish( data ) {

            console.log(PREFIX_INFO + "publish");
            return new Promise((resolve, reject) => {
                console.log(PREFIX_INFO + "publish");
                reject("target File not implemented")
            })


    }
    refresh( ) {
        console.log(PREFIX_INFO + "refresh");
        return this.dataFile;
    }




}
export default proxyFile;