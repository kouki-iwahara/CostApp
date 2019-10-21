<template>
  <div class="content">
    <bg-image />
    <div class="card-columns">
      <div class="card">
        <img
          class="card-img-top"
          src="~/assets/pasta.jpg"
          alt="カード1の画像"
        />
        <div class="card-body">
          <h5 class="card-title">カード1のタイトル</h5>
          <p class="card-text">
            これは、追加コンテンツへの自然な導入として以下のテキストをサポートする、より幅広いカードです。このコンテンツはもう少し長くなります。
          </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">最終更新3分前</small>
        </div>
      </div>
      <div class="card">
        <img
          class="card-img-top"
          src="~/assets/table.jpg"
          alt="カード2の画像"
        />
        <div class="card-body">
          <h5 class="card-title">カード2のタイトル</h5>
          <p class="card-text">
            このカードには、追加のコンテンツへの自然な導入として以下のサポートテキストがあります。
          </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">最終更新3分前</small>
        </div>
      </div>
      <div class="card">
        <img
          class="card-img-top"
          src="~/assets/pasta.jpg"
          alt="カード3の画像"
        />
        <div class="card-body">
          <h5 class="card-title">カード3のタイトル</h5>
          <p class="card-text">
            これは、追加コンテンツへの自然な導入として以下のテキストをサポートする、より幅広いカードです。
            このカードは、同じ高さのアクションを示す最初のものよりも長いコンテンツを持っています。
          </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">最終更新3分前</small>
        </div>
      </div>
      <div class="card">
        <img
          class="card-img-top"
          src="~/assets/pasta.jpg"
          alt="カード2の画像"
        />
        <div class="card-body">
          <h5 class="card-title">カード2のタイトル</h5>
          <p class="card-text">
            このカードには、追加のコンテンツへの自然な導入として以下のサポートテキストがあります。
          </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">最終更新3分前</small>
        </div>
      </div>
      <div class="card">
        <img
          class="card-img-top"
          src="~/assets/table.jpg"
          alt="カード3の画像"
        />
        <div class="card-body">
          <h5 class="card-title">カード3のタイトル</h5>
          <p class="card-text">
            これは、追加コンテンツへの自然な導入として以下のテキストをサポートする、より幅広いカードです。
            このカードは、同じ高さのアクションを示す最初のものよりも長いコンテンツを持っています。
          </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">最終更新3分前</small>
        </div>
      </div>
      <div class="card">
        <img
          class="card-img-top"
          src="~/assets/pasta.jpg"
          alt="カード2の画像"
        />
        <div class="card-body">
          <h5 class="card-title">カード2のタイトル</h5>
          <p class="card-text">
            このカードには、追加のコンテンツへの自然な導入として以下のサポートテキストがあります。
          </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">最終更新3分前</small>
        </div>
      </div>
      <div class="card">
        <img
          class="card-img-top"
          src="~/assets/table.jpg"
          alt="カード3の画像"
        />
        <div class="card-body">
          <h5 class="card-title">カード3のタイトル</h5>
          <p class="card-text">
            これは、追加コンテンツへの自然な導入として以下のテキストをサポートする、より幅広いカードです。
            このカードは、同じ高さのアクションを示す最初のものよりも長いコンテンツを持っています。
          </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">最終更新3分前</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BgImage from '~/components/top/BgImage.vue'

export default {
  components: {
    BgImage
  }
}
</script>

<style scoped>
.card-columns {
  padding: 0 15px;
}
</style>
