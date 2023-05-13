function LeoUploadAdapter(loaderIn, config) {
    this.loaderXccjh = loaderIn;
    this.config = config;
}

LeoUploadAdapter.prototype.upload = function () {
    return this.loaderXccjh.file.then(
        (file) =>
            new Promise((resolve, reject) => {
                if (typeof this.config.imageUpload === 'function') {
                    this.config.imageUpload(file).then(res => {
                        resolve({
                            default: res.url,
                        });
                    }, err => {
                        reject(
                            err
                        );
                    })
                }

            })
    );
}
LeoUploadAdapter.prototype.abort = function () {
}

export function leoUpload(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loaderIn) => {
        return new LeoUploadAdapter(loaderIn, editor.config._config);
    };
}