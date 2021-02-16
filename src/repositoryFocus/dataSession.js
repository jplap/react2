import IDataSession from "./IDataSession";
/*
import dataBlocksFile from '../populateServer/blocksData.json';
import tagsRefFile from '../populateServer/tagsReference.json';
import typeRefFile from '../populateServer/partTypeReference.json';
import categoryRefFile from '../populateServer/blockCategoriesReference.json';
*/


const PREFIX_INFO = "dataSession:INFO:";
const PREFIX_ERROR = "dataSession:ERROR:"

class dataSession extends IDataSession {

    constructor(opts) {
        console.log(PREFIX_INFO + "constructor");

        super(opts);
        this.proxySource = opts.proxySource;
        this.proxyTarget = opts.proxySource;
        this.dataBlocks = null;
    }
    refresh() {
        let data = this.proxySource.refresh();
        if (data != null ) {
            for (let i = 0; i < data.length; i++) {
                if (data[i]) {
                    if (data[i].type === "datas") {
                        //this.dataBlocks = dataBlocksFile;
                        this.dataBlocks = data[i].data;
                    } else if (data[i].type === "tags") {
                        //this.tagsRefFile = tagsRefFile;
                        this.tagsRefFile = data[i].data;
                    } else if (data[i].type === "categories") {
                        //this.categoryRefFile = categoryRefFile;
                        this.categoryRefFile = data[i].data;
                    } else if (data[i].type === "parttypes") {
                        //this.typeRefFile = typeRefFile;
                        this.typeRefFile = data[i].data;
                    }
                }
            }
        }else{
            alert ("no data from server")
        }

        console.log(PREFIX_INFO + "refresh");
        return this;
    }
    publish(){
        return new Promise((resolve, reject) => {
            if ( this.proxyTarget === null || this.proxyTarget === undefined ){
                reject("proxy target nor set");
            }
            var dataToPublish = [];

            if ( this.dataBlocks ){
                let blk = {};
                blk.type = "datas";
                blk.data = this.dataBlocks;
                dataToPublish.push(blk);
            }else if ( this.tagsRefFile ){
                let blk = {};
                blk.type = "tags";
                blk.data = this.tagsRefFile;
                dataToPublish.push(blk);
            }else if ( this.categoryRefFile ){
                let blk = {};
                blk.type = "categories";
                blk.data = this.categoryRefFile;
                dataToPublish.push(blk);
            }else if ( this.typeRefFile ){
                let blk = {};
                blk.type = "parttypes";
                blk.data = this.typeRefFile;
                dataToPublish.push(blk);
            }


            this.proxyTarget.publish(dataToPublish).then((value) => {
                console.log(PREFIX_INFO + "published");
                resolve(value);
            }, function(erreur) {
                console.log(PREFIX_INFO + "publish failed: " + erreur);
                reject(erreur);
            });
        })
    }
    getPartTypesRef = () =>{
        var types = [];
        if ( ! this.typeRefFile || this.typeRefFile === undefined || this.typeRefFile.types === null || this.typeRefFile.types === undefined ) return types;

        for ( var i=0; i<this.typeRefFile.types.length; i++ ){
            if ( this.typeRefFile.types[i] && this.typeRefFile.types[i].name ){
                types.push(this.typeRefFile.types[i].name);
            }
        }
        return types;
    }
    getBlockCategoriesRef = () =>{
        var categories = [];
        if ( ! this.categoryRefFile || this.categoryRefFile === undefined || this.categoryRefFile.categories === null || this.categoryRefFile.categories === undefined ) return categories;
        for ( var i=0; i<this.categoryRefFile.categories.length; i++ ){
            if ( this.categoryRefFile.categories[i] && this.categoryRefFile.categories[i].name ){
                categories.push(this.categoryRefFile.categories[i].name);
            }
        }
        return categories;
    }
    getBlockCategoriesImgRef ( category ){
        var img = [];
        for ( var i=0; i<this.categoryRefFile.categories.length; i++ ){
            if ( this.categoryRefFile.categories[i] && this.categoryRefFile.categories[i].name.toLowerCase() === category.toLowerCase() && this.categoryRefFile.categories[i].img){
                img.push(this.categoryRefFile.categories[i].img);
            }
        }
        return img;
    }

    getBlocks() {
        console.log(PREFIX_INFO + "getBlocks: data" + this.dataBlocks.datas);
        return (this.dataBlocks.datas)

    }

    getBlock(id) {
        for (let i = 0; i < this.dataBlocks.datas.length; i++) {
            // eslint-disable-next-line eqeqeq
            if (this.dataBlocks.datas[i] && this.dataBlocks.datas[i].id && this.dataBlocks.datas[i].id === id && this.dataBlocks.datas[i].category) {
                return this.dataBlocks.datas[i];
            }

        }
        console.log(PREFIX_ERROR + "getBlock: block not found")
        return null;

    }
    getTagsName(idBlock) {

       return this.__getBlockTagName(idBlock);
    }
    /*
    removeTag(idBlock, tagname) {
        if ( tagname != null ) {
            if (this.__getBlockTag(idBlock) != null) {
                this.__getBlockTag(idBlock).push(tagname);
                return true
            }
        }
        return false;

    }
    */
    getTagsRef (){

        let tagLabel = [];
        if ( ! this.tagsRefFile || this.tagsRefFile === undefined || this.tagsRefFile.tags === null || this.tagsRefFile.tags === undefined ) return tagLabel;

        if ( this.tagsRefFile != null && this.tagsRefFile.tags ) {
            for (let i = 0; i < this.tagsRefFile.tags.length; i++) {
                if (this.tagsRefFile.tags[i] && this.tagsRefFile.tags[i].name) {
                    tagLabel.push(this.tagsRefFile.tags[i].name);
                }


            }
        }
        return tagLabel;


    }
    __getTagNameFromId (tagId){
        if ( this.tagsRefFile != null && this.tagsRefFile.tags ) {
            for (let i = 0; i < this.tagsRefFile.tags.length; i++) {
                if (this.tagsRefFile.tags[i] && this.tagsRefFile.tags[i].id && this.tagsRefFile.tags[i].id === tagId) {
                    return (this.tagsRefFile.tags[i].name);
                }


            }
        }
        return null;


    }
    __getTagIdFromName (tagName){
        if ( this.tagsRefFile != null && this.tagsRefFile.tags ) {
            for (let i = 0; i < this.tagsRefFile.tags.length; i++) {
                if (this.tagsRefFile.tags[i] && this.tagsRefFile.tags[i].id && this.tagsRefFile.tags[i].name === tagName) {
                    return (this.tagsRefFile.tags[i].id);
                }


            }
        }
        return null;


    }

    setTagsNames(idBlock, tagsName){
        if ( tagsName != null && tagsName instanceof Array) {
            let currentBlk = this.__getBlock(idBlock);
            if ( currentBlk != null && currentBlk.tags == null ){
                currentBlk.tags =[];
            }
           // if ( currentBlk != null && currentBlk.tags != null) {
                var tagsId = [];
                var found = false;
                for( var i=0; i<tagsName.length; i++ ){
                    var tid = this.__getTagIdFromName(tagsName[i]);
                    if (tid){
                        found = true;
                        tagsId.push({id:tid});
                    }
                }
                if (found === true || tagsName.length === 0) {
                    currentBlk.tags = tagsId;
                }


            //}
            return true;
        }
        return false;
    }
    removeBlock( idBlock ) {
        return (this.__removeBlock(idBlock));
    }
    addBlock( blockdata ){
        if ( blockdata && blockdata.id ){
            this.dataBlocks.datas.push(blockdata)
        }
    }




    removePart(idBlock, partId) {

        let currentBlk = this.__getBlock(idBlock);
        for (let j = 0; j < currentBlk.parts.length; j++) {

            if (currentBlk.parts[j] != null && currentBlk.parts[j].id != null  && currentBlk.parts[j].id === partId) {
                // BlockPartCreationJs a detruire
                console.log(PREFIX_INFO + "remove: part id" + currentBlk.parts[j].id);
                //delete currentBlk.parts[j];
                currentBlk.parts.splice(j, 1);
                return;
            }

        }


    }


    addPart(idBlock, part) {

        let currentBlk = this.__getBlock(idBlock);
        if (!currentBlk.parts) {
            currentBlk.parts = [];
        }

        let newPart = part;
        newPart.id = this.__getNewIdPart(currentBlk.parts);
        currentBlk.parts.push(newPart)


    }
    updatePart( idBlock, part ) {

        if ( part && part.id && part.data && part.type){
            let currentBlk = this.__getBlock(idBlock);
            for ( var i=0; i<currentBlk.parts.length; i++ ){

                if ( currentBlk.parts != null && currentBlk.parts[i].id === part.id){
                    currentBlk.parts[i].data = part.data;
                    currentBlk.parts[i].type = part.type;
                    return true;
                }

            }

        }
        return false;


    }
    commit(){
        return new Promise((resolve, reject) => {
            this.publish().then((value) => {
                console.log(PREFIX_INFO + "commited");
                resolve(value);
            }, function(erreur) {
                console.log(PREFIX_INFO + "commit failed: " + erreur);
                reject(erreur);
            });

        })

    }

    __getBlock(idBlock) {
        let block = {};
        if ( ! this.dataBlocks || this.dataBlocks === undefined || this.dataBlocks.datas === null || this.dataBlocks.datas === undefined ) return block;

        for (let i = 0; i < this.dataBlocks.datas.length; i++) {
            if (this.dataBlocks.datas[i] && this.dataBlocks.datas[i].id && idBlock === this.dataBlocks.datas[i].id) {
                // BlockContent Trouvé: recherche de la par
                return this.dataBlocks.datas[i]

            }


        }
        return block

    }
    __getBlockTagName(idBlock){
        let tagsName = [];
        let currentBlk = this.__getBlock(idBlock);
        if ( currentBlk != null && currentBlk.tags != null) {
            for( var j=0; j<currentBlk.tags.length; j++){
                if( currentBlk.tags[j] && currentBlk.tags[j].id ){
                    tagsName.push(this.__getTagNameFromId(currentBlk.tags[j].id ));
                }
            }

        }
        return tagsName;

    }
    __removeBlock(idBlock) {
        for (let i = 0; i < this.dataBlocks.datas.length; i++) {
            if (this.dataBlocks.datas[i] && this.dataBlocks.datas[i].id && idBlock === this.dataBlocks.datas[i].id) {
                // BlockContent Trouvé: recherche de la par

                console.log(PREFIX_INFO + "remove: block id" + this.dataBlocks.datas[i].id);
                //delete currentBlk.parts[j];
                this.dataBlocks.datas.splice(i, 1);
                return true;

            }


        }
        return false

    }
    __getNewIdPart(parts) {
        var maxId = 0;
        for (let i = 0; i < parts.length; i++) {
            if (parts[i] && parts[i].id > maxId ){
                maxId = parts[i].id
            }

        }
        return maxId+1;
    }


}

export default dataSession;
