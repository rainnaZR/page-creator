function install(app: any){
    app.config.errorHandler = (err: any, vm: any, info: any) => {
        // todo 上报监控系统
        console.error('11111111111111', err, vm, info)
    }
}

export default {
    install
};