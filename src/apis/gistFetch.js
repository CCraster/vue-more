/**
 * @author: Craster
 * @date: 20190917
 * @description:
 */
import { fetch } from '@/common/io';
import { SERVER } from '@/constants/';

/*  */
export function getSingleGist(gistId) {
    return fetch({
        url: `${SERVER}/gists/${gistId}`,
        method: 'get'
    });
}

/*  */
export function addGistFile(gistId, data) {
    let data_reconstruct = {
        files: {
            [data.oldFileName]: {
                content: JSON.stringify(data),
                filename: data.fileName
            }
        }
    };
    return fetch({
        url: `${SERVER}/gists/${gistId}`,
        data: data_reconstruct,
        method: 'patch'
    });
}

/*  */
export function editGistFile(gistId, data) {
    let data_reconstruct = {
        files: {
            [data.fileName]: {
                content: JSON.stringify(data)
            }
        }
    };
    return fetch({
        url: `${SERVER}/gists/${gistId}`,
        data: data_reconstruct,
        method: 'patch'
    });
}

/*  */
export function deleteGistFile(gistId, fileName) {
    let data_reconstruct = {
        files: {
            [fileName]: null
        }
    };
    return fetch({
        url: `${SERVER}/gists/${gistId}`,
        data: data_reconstruct,
        method: 'patch'
    });
}
