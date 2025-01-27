import {appFetch, config} from './appFetch';

export const createChat = (participantUserName, onSuccess, onErrors) =>
    appFetch('/chats', config('POST', {participantUserName}), onSuccess, onErrors);

export const getChat = (chatId, onSuccess, onErrors) =>
    appFetch(`/chats/${chatId}`, config('GET', null), onSuccess, onErrors);

export const getUserChats = (onSuccess, onErrors) =>
    appFetch('/chats/user', config('GET', null), onSuccess, onErrors);

export const deleteChat = (chatId, onSuccess, onErrors) =>
    appFetch(`/chats/${chatId}`, config('DELETE', null), onSuccess, onErrors);

export const sendMessage = (chatId, content, onSuccess, onErrors) =>
    appFetch(`/chats/${chatId}/messages`, config('POST', {content}), onSuccess, onErrors);

export const getMessages = (participantUserName, onSuccess, onErrors) =>
    appFetch(`/chats/${participantUserName}/messages`, config('GET', null), onSuccess, onErrors);
