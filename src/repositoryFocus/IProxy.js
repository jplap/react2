var PREFIX_INFO = "IProxy:INFO: ";
//var PREFIX_ERROR = "IProxy:ERROR: "

class IProxy {

    constructor() {
        console.log(PREFIX_INFO + "constructor");
    }
    init(){

    }



    publish( data ) {

    }

    refresh() {
        console.log(PREFIX_INFO + "refresh");
        let dataToReturn = [];

        let data = {};
        data.type = "datas";
        data.data = this.dataBlocks;
        dataToReturn.push(data);

        let tags = {};
        tags.type = "tags";
        tags.data = this.tagsRefFile;
        dataToReturn.push(tags);

        let categories = {};
        categories.type = "categories";
        categories.data = this.categoryRefFile;
        dataToReturn.push(categories);

        let partTypes = {};
        partTypes.type = "parttypes";
        partTypes.data = this.typeRefFile;
        dataToReturn.push(partTypes);

        return dataToReturn;

    }


}
export default IProxy;