<template>
  <div class="Prelaunch">
    <TitleBar :content="false" />
    <div class="Content">
      <div class="Title">
        <Logo class="Logo" />
        <h1 class="Name">
          {{ $t("UK Poisons Information Database") }}
        </h1>
      </div>

      <UkpidProgressRing
        v-if="loading"
        size="huge"
        :label="label"
        label-position="below"
      />

      <div v-else class="LoginContainer">
        <UkpidMessageBar
          v-if="error || offline"
          :compact="true"
          intent="warning"
          data-testid="offlineMessage"
        >
          <template v-if="error === 'INTERNET_DISCONNECTED'" #title>
            {{ $t("Your computer isn't connected to the internet.") }}
          </template>
          <template v-else #title
            >{{ $t("Unable to connect to the UKPID server.") }}
          </template>

          <template v-if="offline" #message
            >{{
              $t(
                "You may use the application offline. Any data saved while offline will be automatically synced to the UKPID server when the connection is restored.",
              )
            }}
          </template>
          <template v-else #message
            >{{ $t("Check your connection and try again.") }}
          </template>
        </UkpidMessageBar>

        <UkpidButtonGroup v-if="needsLogin || offline">
          <UkpidButton v-if="needsLogin" appearance="accent" @click="login"
            >{{ $t("Log in") }}
          </UkpidButton>
          <UkpidButton v-if="offline" appearance="accent" @click="launch"
            >{{ $t("Continue offline as {user}", { user: user.name }) }}
          </UkpidButton>
        </UkpidButtonGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, toRaw } from "vue";
import { useI18n } from "vue-i18n";
import { captureMessage } from "@sentry/electron";
import { apiRequest } from "@/modules/apiRequest";
import TitleBar from "@/components/TitleBar/TitleBar.vue";
import Logo from "@/assets/UKPIDLogoColour.svg";
import UkpidMessageBar from "@/components/UkpidMessageBar.vue";
import UkpidButtonGroup from "@/components/UkpidButtonGroup.vue";
import UkpidButton from "@/components/UkpidButton.vue";
import UkpidProgressRing from "@/components/UkpidProgressRing.vue";

const { t } = useI18n();

const loading = ref(true);
const label = ref();
const accessToken = ref();
const user = ref();
const error = ref();
const offline = ref(false);

const launch = () => {
  window.application.launch(toRaw(user.value));
};

const login = () => {
  needsLogin.value = true;
  loading.value = false;
  error.value = null;
  window.auth.login();
};

const needsLogin = ref(false);

const failedToLoad = async (reason) => {
  const lastUser = await window.user.get();

  loading.value = false;
  needsLogin.value = true;
  error.value = reason;

  if (lastUser?.id) {
    user.value = lastUser;
    offline.value = true;
  }
};

const afterAuth = async () => {
  try {
    user.value = (await apiRequest({ key: "userApi", method: "me" }))?.data;

    launch();
  } catch (error) {
    if (error.cause?.status === 401) {
      login();
      return;
    }

    captureMessage(
      `Connection error when contacting backend: ${error.message}`,
    );

    // Check if there's a user stored in the backend, if so, allow offline mode
    const lastUser = await window.user.get();

    if (lastUser?.id) {
      user.value = lastUser;
      offline.value = true;
      loading.value = false;
    } else {
      await failedToLoad(error.cause);
    }

    // Retry every 10 seconds
    setTimeout(afterAuth, 10000);
  }
};

window.auth.onFailedToLoad((_event, reason) => failedToLoad(reason));

window.auth.onAuthenticated(() => {
  loading.value = true;
  needsLogin.value = false;

  afterAuth();
});

onMounted(async () => {
  if (await window.auth.isLoginRequired()) {
    needsLogin.value = true;
    loading.value = false;
  } else {
    await afterAuth();
  }
});
</script>

<style lang="scss" scoped>
@use "@/scss/abstracts/functions" as fns;

.Prelaunch {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.Content {
  display: flex;
  position: absolute;
  top: env(titlebar-area-height);
  left: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - env(titlebar-area-height));
  padding: 0 fns.gap(1);
  gap: fns.gap(3);
}

.Title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: fns.gap(2);
}

.Logo {
  height: 100px;
}

.Name {
  margin-top: 0;
  margin-bottom: 0;
  font-size: var(--type-ramp-plus-2-font-size);
  line-height: var(--type-ramp-plus-2-line-height);
  text-align: center;
}

.LoginContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: fns.gap(1);
}
</style>
