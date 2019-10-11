import request from '@/common/request';

export default {
    list(query) {
        console.log(query);
    },
    getSingleGist(gistId) {
        return request({
            url: `/gists/${gistId}`
        });
    },
    addGistFile(gistId, data) {
        let data_reconstruct = {
            files: {
                [data.oldFileName]: {
                    content: JSON.stringify(data),
                    filename: data.fileName
                }
            }
        };
        return request({
            url: `/gists/${gistId}`,
            data: data_reconstruct,
            method: 'patch'
        });
    },
    editGistFile(gistId, data) {
        let data_reconstruct = {
            files: {
                [data.fileName]: {
                    content: JSON.stringify(data)
                }
            }
        };
        return request({
            url: `/gists/${gistId}`,
            data: data_reconstruct,
            method: 'patch'
        });
    },
    deleteGistFile(gistId, fileName) {
        let data_reconstruct = {
            files: {
                [fileName]: null
            }
        };
        return request({
            url: `/gists/${gistId}`,
            data: data_reconstruct,
            method: 'patch'
        });
    }
};
