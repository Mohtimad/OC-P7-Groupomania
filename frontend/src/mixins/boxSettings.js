import store from '../store'

const Mixin = {
    methods: {
        newPostBoxSettings : () => {
            store.state.box.isOpen = true
            store.state.box.titleBox = 'Nouveau'
            store.state.box.commentActive = true
            store.state.box.imageInputActive = true
            store.state.box.titleActive = true
            store.state.box.imageURL = require('../assets/plus_empty.png')
            store.state.box.title = "";
            store.state.box.comment = "";
            store.state.api.routeServer = '/newPost' + '/'
            store.state.api.method = 'POST'
        },
        editPostBoxSettings: (e) => {
            store.state.box.titleBox = 'Modifier'
            store.state.box.commentActive = false
            store.state.box.imageInputActive = true
            store.state.box.titleActive = true
            store.state.api.routeServer = '/'
            store.state.api.method = 'PUT'
            const postId = e.srcElement.value
            store.state.box.postIdSelected = postId
            const elt = document.getElementById('post-id-'+ postId)
            store.state.box.imageURL = elt.getElementsByTagName('img')[0].getAttribute('src')
            store.state.box.title = elt.getElementsByClassName('title')[0].textContent
            store.state.box.comment = "";
            store.state.box.isOpen = true
        },
        deletePostBoxSettings: (e) => {
            store.state.box.titleBox = 'Supprimer'
            store.state.box.commentActive = false
            store.state.box.imageInputActive = false
            store.state.box.titleActive = false
            store.state.api.routeServer = '/'
            store.state.api.method = 'DELETE'
            const postId = e.srcElement.value
            store.state.box.postIdSelected = postId
            const elt = document.getElementById('post-id-'+ postId)
            store.state.box.imageURL = elt.getElementsByTagName('img')[0].getAttribute('src')
            store.state.box.title = elt.getElementsByClassName('title')[0].textContent
            store.state.box.comment = "";
            store.state.box.isOpen = true
        },
        commentPostBoxSettings: (e) => {
            store.state.box.titleBox = 'Commenter'
            store.state.api.routeServer = 'comment' + '/'
            store.state.api.method = 'POST'
            store.state.box.commentActive = true
            store.state.box.imageInputActive = false
            store.state.box.titleActive = false
            const postId = e.srcElement.value
            store.state.box.postIdSelected = postId
            const elt = document.getElementById('post-id-'+ postId)
            store.state.box.imageURL = elt.getElementsByTagName('img')[0].getAttribute('src')
            store.state.box.title = elt.getElementsByClassName('title')[0].textContent
            store.state.box.comment = "";
            store.state.box.isOpen = true
        },
    }
}

export { Mixin }