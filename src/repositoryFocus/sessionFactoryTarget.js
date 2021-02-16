
import ISessionFactory from "./ISessionFactory";



class sessionFactoryTarget extends ISessionFactory {


    static get(){
        return ISessionFactory.get();
    }
    static create(opts){
        return ISessionFactory.create(opts)


    }
}
export default sessionFactoryTarget;
