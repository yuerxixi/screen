import request from './../utils/request'

export function getVideo(data) {
    return request({
        url: 'http://192.168.32.139:8081/api/video/live?cameraIndexCode=71304e43a10e4aeb959b2f1fae7c0a19',
        method: 'get',
        params: data,
        headers: {
            'token': 'ce17d086ae8575ac5bae6d4f57a921e4'
        }
    })
}
