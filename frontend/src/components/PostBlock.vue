<template>
    <div :id="'post-id_'+thisPost.id" class="post-block">
        <div class="setting">
            <button type="button" @click="boxPost.value='new-comment_'+thisPost.id">Commenter</button>
            <span v-if="user.isAdmin === 1 || thisPost.userId == user.id">
                <button type="button" @click="boxPost.value='edit-post_'+thisPost.id">Modifier</button>
            </span>
            <span v-if="user.isAdmin === 1 || thisPost.userId == user.id">
                <button type="button" @click="boxPost.value='delete-post_'+thisPost.id">Supprimer</button>
            </span>
        </div>
        <h2 class="title">{{ thisPost.title }} </h2>
        <p class="description">{{ thisPost.desc }}</p>
        <p class="author"> Par {{thisPost.username}} le {{thisPost.createdAt.split('T')[0].split('-').reverse().join('/')}}</p>
        <section class="post">
            <div class="picture-block">
                <img :src="thisPost.imgURL" :alt="thisPost.title +' by ' + thisPost.username">
            </div>
            <div class="comment-block">
                <div v-for="(thisComment, index) in allComments[0]" :key="(thisComment[0], index)">
                    <div>
                        <div v-if="thisPost.id === thisComment.postId" class="author">
                            <p>{{thisComment.author}} le {{thisComment.createdAt.split('T')[0].split('-').reverse().join('-')}}</p>
                        </div>
                        <div v-if="thisPost.id === thisComment.postId" class="comment">
                            <button v-if="user.isAdmin || thisComment.authorId === user.id" @click="boxPost.value='delete-comment_'+thisPost.id">Supprimer</button>
                            <button v-if="user.isAdmin || thisComment.authorId === user.id" @click="boxPost.value='edit-comment_'+thisPost.id">Modifier</button>
                            <cite>{{thisComment.comment}}</cite>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PostBlock',
  props: {
    thisPost: {
        type: Object,
    },
    allComments: {
        type: Array,
    },
  },
  computed: {
    ...mapState(['user', 'boxPost'])
  },
}

</script>

<style scoped lang="scss">
    .post-block {
        display: flex;
        flex-direction: column;
        max-width: 1024px;
        margin: auto;
        margin-bottom: 30px;
        width: 80%;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 3px;
        padding: 20px;
        .description {
            text-align: left;
            color: white;
        }
        .title{
            margin: 0;
            text-align: left;
        }
        .author {
            color: #6e82bb;
            font-style: italic;
            font-size: .8rem;
            text-align: right;
        }
        .setting {
            text-align: center;
        }
        .post {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            .picture-block {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 200px;
                width: 100%;
                border-radius: 3px;
                background-color: rgba(0, 0, 0, 0.3);
                overflow: hidden;
                padding: 5px;
                margin: 10px 0;
                img {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            .comment-block {
                border-radius: 3px;
                overflow: hidden;
                width: 100%;
                max-height: 300px;
                overflow-y: scroll;
                .author {
                    margin-right: 20px;
                    color: #6e82bb;
                    font-style: italic;
                    font-size: .8rem;
                }
                .comment {
                    margin: 0 15px 5px 0;
                    background-color: #3a4f66;
                    border-radius: 15px;
                    padding: 6px;
                    font-style: normal;
                    font-size: 0.9rem;
                    color: #ffffff;
                    overflow: hidden;
                    &:hover {
                    button {
                        opacity: 1;
                        margin-left: 0
                    }}
                    button {
                    transition: all .2s ease-out;
                    opacity: 0;
                    margin-left: -70px;
                    border-radius: 25px;
                    }
                }
            }
        }
    }
</style>
