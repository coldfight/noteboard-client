<template>
  <div class="home">
    <div class="container">
      <div class="card-group">
        <div class="card">
          <img
            class="card-img-top"
            src="https://placekitten.com/252/180"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">Step One</h5>
            <p class="card-text">Sign up or Sign in with your account.</p>
            <!-- <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
            </p>-->
          </div>
        </div>
        <div class="card">
          <img
            class="card-img-top"
            src="https://placekitten.com/252/180"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">Step Two</h5>
            <p class="card-text">Create a board.</p>
            <!-- <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
            </p>-->
          </div>
        </div>
        <div class="card">
          <img
            class="card-img-top"
            src="https://placekitten.com/252/180"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">Step Three title</h5>
            <p class="card-text">Create, arrange, customize, and save notes.</p>
            <!-- <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
            </p>-->
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm text-center">
          <router-link :to="{ name: '@noteboardsPage' }"
            >Let's Get Started</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage"
};
</script>
