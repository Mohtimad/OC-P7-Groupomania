<template>
  <div :id="'post-id-'+thePost.id" class="posts">
    <div class="setting">
        <button type="button" :value="thePost.id" @click="commentPostBoxSettings">Commenter</button>
        <span v-if="user.isAdmin === 1 || thePost.userId == user.id">
            <button type="button" :value="thePost.id" @click="editPostBoxSettings">Modifier</button>
        </span>
        <span v-if="user.isAdmin === 1 || thePost.userId == user.id">
            <button type="button" :value="thePost.id" @click="deletePostBoxSettings">Supprimer</button>
        </span>
    </div>
    <section>
        <div class="picture-block">
            <img :src="thePost.imgURL" alt="">
        </div>
            <div class="comment-block">
                <p class="title">{{ thePost.title }} </p>
                <div v-for="theComment in allComments[0]" :key="theComment[0]">
                    <span v-if="thePost.id == theComment.postId" class="author">{{ theComment.author }}</span>
                    <div v-if="thePost.id == theComment.postId" class="comment"><cite>{{theComment.comment}}</cite></div>
                </div>
            </div>
      </section>
  </div>
</template>

<script>
import { Mixin } from '../mixins/boxSettings'
import { mapState } from 'vuex'
export default {
  props: {
    thePost: {
        type: Object,
    },
    allComments: {
        type: Array,
    },
  },
  methods: {
    
},
  name: 'Posts',
  computed: {
    ...mapState(['user', 'box'])
  },
  mixins: [Mixin],
}

</script>

<style scoped lang="scss">
    .posts {
        display: flex;
        flex-direction: column;
        max-width: 1024px;
        margin: auto;
        margin-bottom: 30px;
        width: 80%;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        padding: 20px;
        section {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
        }
        .setting {
            text-align: center;
        }
        .picture-block {
            display: flex;
            justify-content: center;
            align-items: center;
            max-height: 500px;
            min-height: 200px;
            width: 30%;
            border-radius: 10px;
            background-color: rgba(0, 0, 0, 0.3);
            overflow: hidden;
            padding: 5px;
            margin-top: 10px;
            img {
                max-width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 10px;
            }
        }
        .comment-block {
            margin: 10px 10px 0 10px;
            border-radius: 10px;
            overflow: hidden;
            width: 60%;
            max-height: 500px;
            overflow-y: scroll;
            .title {
                color: white;
                font-size: 1.2rem;
                padding-bottom: 10px;
                text-transform: uppercase;
            }
            .author {
                color: #6e82bb;
                font-style: italic;
                font-size: .8rem;
            }
            .comment {
                margin: 0 15px 15px 0;
                background-color: #3a4f66;
                border-radius: 15px;
                padding: 6px;
                font-style: normal;
                font-size: 0.9rem;
                color: #ffffff;
            }
        }
    }
</style>
