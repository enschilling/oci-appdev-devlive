#!/usr/bin/env zx

import { buildJarMaven, getVersionMaven } from "./lib/maven.mjs";
import {
  buildImage,
  checkPodmanMachineRunning,
  containerLogin,
  pushImage,
  tagImage,
} from "./lib/container.mjs";
import { readEnvJson } from "./lib/utils.mjs";
import { getOutputValues } from "./lib/terraform.mjs";

const shell = process.env.SHELL | "/bin/zsh";
$.shell = shell;
$.verbose = false;

const { namespace, registry_url } = await readEnvJson();
const { user_name, user_auth_token, repository_name } = await getOutputValues(
  "deployment/terraform"
);

await checkPodmanMachineRunning();
await loginContainerRegistry(
  registry_url,
  namespace,
  user_name,
  user_auth_token
);

await buildAndReleaseServiceAdMessage();

async function loginContainerRegistry(
  registry_url,
  namespace,
  user_name,
  user_auth_token
) {
  console.log("Login to container registry...");

  await containerLogin(namespace, user_name, user_auth_token, registry_url);
  console.log();
}

async function buildAndReleaseServiceAdMessage() {
  const pwd = (await $`pwd`).stdout.trim();

  const service = "admessage";
  await cd(`src/${service}`);
  const version = await getVersionMaven();
  await buildJarMaven();

  const image_name = `${service}`;
  await buildImage(`localhost/${image_name}`, version);
  const local_image = `localhost/${image_name}:${version}`;
  const remote_image = `${registry_url}/${namespace}/${repository_name}/${image_name}:${version}`;
  await tagImage(local_image, remote_image);
  await pushImage(remote_image);
  console.log(`Released: ${chalk.yellow(remote_image)}`);

  await cd(pwd);
}
