

import IProxy from "./IProxy";

var PREFIX_INFO = "proxyServer:INFO: ";
//var PREFIX_ERROR = "proxyServer:ERROR: "



class proxyServer extends IProxy {

    constructor(props) {
        super(props)
        console.log(PREFIX_INFO + "constructor");
        this.dataServer = null;
        this.ErrorInfo = {}
    }

    init() {
        return new Promise((resolve, reject) => {
            console.log(PREFIX_INFO + "init");

            var options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                //mode: 'no-cors',
                body: JSON.stringify({})
            };
            var that = this;
            //fetch('http://localhost:8686/service/admin/refresh', options)
            fetch('/service/backend/admin/refresh', options)
                .then(function (res) {
                    if (res.ok){
                        that.ErrorInfo = {}
                    }else{
                        that.ErrorInfo = {status: res.status, url: res.url, statusText: res.statusText}
                    }
                    var p = res.json();
                    return p;
                })
                .then(function (data) {
                    //alert( JSON.stringify( data ) )
                    /*
                    for (var i=0; i<data.length; i++ ){
                        if (data[i].type ==="datas" ){
                            that.dataBlocks = data[i].data
                        }else if (data[i].type ==="categories" ){
                            that.categoryRefFile = data[i].data;
                        }else if (data[i].type ==="tags" ){
                            that.tagsRefFile = data[i].data;
                        }
                    }

                     */
                    that.dataServer = data;
                    resolve();
                }).catch(function ( error) {
                    console.log(PREFIX_INFO + "publish error:" + error );
                    let additionnalInfo = "";
                    if ( that.ErrorInfo ){
                        additionnalInfo = JSON.stringify(that.ErrorInfo);
                    }
                    //alert ("Communication with server failed: Error: " + error);
                    reject("Communication with server failed error: " + error + " infos: " + additionnalInfo );
                });


        })


    }


    publish(data) {
        console.log(PREFIX_INFO + "publish");
        return new Promise((resolve, reject) => {


            var options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                //mode: 'no-cors',
                body: JSON.stringify(data)
            };
            var that = this;
            //fetch('http://localhost:8686/service/admin/publish', options)
            fetch('/service/backend/admin/publish', options)
                .then(function (res) {
                    if (res.ok){
                        that.ErrorInfo = {}
                    }else{
                        that.ErrorInfo = {status: res.status, url: res.url, statusText: res.statusText}
                    }
                    var p = res.json();
                    return p;
                })
                .then(function (data) {
                    console.log(PREFIX_INFO + "published");
                    resolve(data);
                }).catch(function ( error) {
                    console.log(PREFIX_INFO + "publish error:" + error );
                    let additionnalInfo = "";
                    if ( that.ErrorInfo ){
                        additionnalInfo = JSON.stringify(that.ErrorInfo);
                    }
                    //alert ("Communication with server failed: Error: " + error);
                    reject("Communication with server failed error: " + error + " infos: " + additionnalInfo );
                });


        })

    }

    refresh() {
        console.log(PREFIX_INFO + "refresh");
        return this.dataServer;

    }



}

export default proxyServer;