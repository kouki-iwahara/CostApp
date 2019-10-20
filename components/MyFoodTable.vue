<template>
  <div>
    <nav aria-label="パンくずリスト">
      <ol class="breadcrumb mb-1">
        <li class="breadcrumb-item">
          <nuxt-link to="/" class="nav-link">
            トップ
          </nuxt-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">マイページ</li>
      </ol>
    </nav>
    <!-- /nav aria-label="パンくずリスト" -->
    <div class="user-name">
      <strong>xxxxxxxxさんのマイページ</strong>
    </div>
    <div class="card">
      <div class="card-header">
        <b-navbar class="header navbar" toggleable="md">
          <b-navbar-nav class="nav-list_item">
            <ul class="navbar-nav nav-tabs">
              <!-- アクティブつけたい -->
              <li class="nav-item">
                <nuxt-link to="/home/food" class="nav-link active">
                  食材一覧
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link to="/home/recipe" class="nav-link">
                  レシピ一覧
                </nuxt-link>
              </li>
            </ul>
          </b-navbar-nav>
          <!-- /nav-list_item -->
          <!-- /nav-list -->
        </b-navbar>
      </div>
      <div class="card-body">
        登録されていません的な
      </div>
      <table class="table mb-0 table-hover">
        <thead class="">
          <tr>
            <th scope="col">食材名</th>
            <th scope="col">原価</th>
            <th scope="col">最終更新</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>jijijsd</td>
            <td>jijijsd</td>
            <td>jijijsd</td>
          </tr>
          <tr>
            <td>jijijsd</td>
            <td>jijijsd</td>
            <td>jijijsd</td>
          </tr>
          <tr>
            <td>jijijsd</td>
            <td>jijijsd</td>
            <td>jijijsd</td>
          </tr>
          <tr>
            <td>jijijsd</td>
            <td>jijijsd</td>
            <td>jijijsd</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.user-name {
  font-size: 1.25em;
  margin: 20px 0;
}
.breadcrumb-item .nav-link {
  display: inline;
  padding: 0;
}
.table th {
  border-top: none;
}
.table td {
  cursor: pointer;
}
.card {
  border: none;
}
.card-header {
  border: none;
  padding: 0;
}
.navbar {
  /* border: none; */
  padding: 0;
}
</style>
