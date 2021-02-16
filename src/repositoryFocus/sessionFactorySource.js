
import ISessionFactory from "./ISessionFactory";



class sessionFactorySource  extends ISessionFactory{


    static get(){
        return ISessionFactory.get();
    }
    static create(opts){
        return ISessionFactory.create(opts)


    }
}
export default sessionFactorySource;
