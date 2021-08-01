<template>
  <div :id="thePost.id" class="posts">
    <div class="setting">
        <button @click="$store.state.isBoxOpen = true">Commenter</button>
        <span v-if="user.isAdmin === 1 || thePost.id == user.id">
            <button>Modifier</button>
        </span>
        <span v-if="user.isAdmin === 1 || thePost.id == user.id">
            <button>Supprimer</button>
        </span>
    </div>
    <section>
        <div class="pictureBlock">
            <img :src="thePost.imgURL" alt="">
        </div>
            <div class="comment-block">
                <p class="title">{{ thePost.title }} <span class="author">De {{ thePost.username }}</span></p>
                <div v-for="item in allComments" :key="item">
                    <div v-if="thePost.id == item.postId" class="comment"><cite><span class="user-name">{{item.c_username}} </span>: {{item.comment}}</cite></div>
                </div>
                <NewPostBox />
            </div>
      </section>
  </div>
</template>

<script>
import NewPostBox from '../components/NewPostBox.vue'
import { mapState } from 'vuex'
export default {
    components : {
        NewPostBox
    },
  props: ['thePost','allComments'],
  name: 'Posts',
  computed: {
    ...mapState(['user'])
  },
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
        .pictureBlock {
            display: flex;
            justify-content: center;
            align-items: center;
            max-height: 500px;
            width: 30%;
            border-radius: 10px;
            background-color: rgba(0, 0, 0, 0.3);
            overflow: hidden;
            padding: 5px;
            margin-top: 10px;
            img {
                width: 100%;
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
                color: #7a7a7a;
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
            .user-name {
                font-style: italic; 
                font-weight: bold;
                color: #6e82bb;
            }

        }
    }
</style>
