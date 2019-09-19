/**
 * @author: Craster
 * @date: 20190917
 * @description:
 */
import { fetch } from '@/common/io';

/*  */
export function getRootUserGist() {
    return fetch({
        url: 'https://api.github.com/gists/6f63ac9cf42770a1ab4699b1620a8729',
        method: 'get'
    });
}
