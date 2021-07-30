<template>
  <div class="posts">
    <div class="setting">
        <button>Commenter</button>
        <button>Modifier</button>
        <button>Supprimer</button>
    </div>
    <section>
        <div class="pictureBlock">
            <img src="https://www.meillandrichardier.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/4/7/4745-tournesol_fleur_g_ante-to-pm144137.jpg" alt="">
        </div>
            <div class="comment-block">
                <p class="title">Titre du poste <span class="author">De Mohtimad</span></p>
                <div class="comment"><cite><span class="user-name">Username : </span>Commentaire d'un utilisateur ! !</cite></div>
                <div class="comment"><cite><span class="user-name">Username : </span>Commentaire d'un utilisateur rtg er t zrt gz er gze rg er gz erg z erg ze rg qsd vze rg  gz ergzergzerg d gzergrg! !</cite></div>
                <div class="comment"><cite><span class="user-name">Username : </span>Commentaire d'un utilisateur rtg er t zrt gz er gzergzerg d gzergrg! !</cite></div>
                <div class="comment"><cite><span class="user-name">Username : </span>Commentaire d'un utilisateur rtg er t zrt gz er gze rg er gzrg qsd vze rg  gz ergzergzerg d gzergrg! !</cite></div>
            </div>
      </section>
  </div>
</template>

<script>
export default {
  name: 'Posts',
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
            height: 100%;
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
            height: 300px;
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
