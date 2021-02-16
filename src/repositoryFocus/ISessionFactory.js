import proxyFile from "./proxyFile";
import dataSession from "./dataSession";
import proxyServer from "./proxyServer";

var PREFIX_INFO = "ISessionFactory:INFO: ";
var PREFIX_ERROR = "ISessionFactory:ERROR: "

class ISessionFactory {

    static get(){
        if ( this.currentRepo ) {
            return this.currentRepo;
        }else{
            console.log (PREFIX_ERROR + 'get: Default implementation will be instanciate');
            return null;
            //return this.create({"name":"file"})
        }
    }
    static create(opts){
        return new Promise((resolve, reject) => {
            //if (this.currentRepo ) resolve(this.currentRepo);
            if (opts && opts.name && opts.name === "file") {
                console.log(PREFIX_INFO + 'create: file local implementation');
                let proxyFileInst = new proxyFile();
                proxyFileInst.init().then((value) => {
                    this.currentRepo = new dataSession({proxySource: proxyFileInst}); //fs.readFileSync(dirPath);
                    this.currentRepo.init();
                    this.currentRepo.refresh();
                    resolve(this.currentRepo);
                })

                //return this.currentRepo;
            } else if (opts && opts.name && opts.name === "server") {
                console.log(PREFIX_INFO + 'create: server implementation');
                let proxyServerInst = new proxyServer();
                proxyServerInst.init().then((value) => {
                    this.currentRepo = new dataSession({proxySource: proxyServerInst}); //fs.readFileSync(dirPath);
                    this.currentRepo.init();
                    this.currentRepo.refresh();
                    resolve(this.currentRepo);
                }, function(erreur) {
                    reject(erreur)

                })


                //return this.currentRepo;

            } else {
                console.log(PREFIX_ERROR + 'create:Unknown implementation required');
                reject(null);
                //return null;
            }
        })


    }



}
export default ISessionFactory;