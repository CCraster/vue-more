import request from '@/utils/request'

export default {
  list(query) {
    console.log(query)
  },
  getSingleGist(gistId) {
    return request({
      url: `/gists/${gistId}`
      // headers: {
      //     Accept: 'application/vnd.github.v3.html+json'
      // }
    })
  },
  addGistFile(gistId, data) {
    // let oldFileName = data.oldFileName;
    // delete data.oldFileName;
    let data_reconstruct = {
      files: {
        [data.uid]: {
          content: JSON.stringify(data)
        }
      }
    }
    return request({
      url: `/gists/${gistId}`,
      data: data_reconstruct,
      method: 'patch'
    })
  },
  editGistFile(gistId, data) {
    let data_reconstruct = {
      files: {
        [data.uid]: {
          content: JSON.stringify(data)
        }
      }
    }
    return request({
      url: `/gists/${gistId}`,
      data: data_reconstruct,
      method: 'patch'
    })
  },
  deleteGistFile(gistId, fileName) {
    let data_reconstruct = {
      files: {
        [fileName]: null
      }
    }
    return request({
      url: `/gists/${gistId}`,
      data: data_reconstruct,
      method: 'patch'
    })
  }
}
