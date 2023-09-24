import 'core-js/stable';
import * as _ from 'lodash';
import printMe from './print';
import {cube} from './math';
import './another-module';
import './style.css';
import Icon from './icon.png';
import Data from './data.xml';
import Notes from './data.csv';
import toml from './data.toml';
import yaml from './data.yaml';
import json from './data.json5';

function isJsonObject(value: unknown): value is object {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

type OwnerData = {
  name: string,
  organization: string,
  bio: string,
  dob: string
}

function isOwnerData(value: unknown): value is OwnerData {
  return isJsonObject(value) && 'name' in value && 'organization' in value && 'bio' in value && 'dob' in value;
}

type TitleData = {
  title: string,
  owner: OwnerData
}

function isTitleData(value: unknown): value is TitleData {
  return isJsonObject(value) && 'title' in value && 'owner' in value && isOwnerData(value.owner);
}

if (isTitleData(toml)) {
  console.log(toml.title); // output `TOML Example`
  console.log(toml.owner.name); // output `Tom Preston-Werner`
}

if (isTitleData(yaml)) {
  console.log(yaml.title); // output `YAML Example`
  console.log(yaml.owner.name); // output `Tom Preston-Werner`
}

if (isTitleData(json)) {
  console.log(json.title); // output `JSON5 Example`
  console.log(json.owner.name); // output `Tom Preston-Werner`
}

function component(): HTMLElement {
  const container: HTMLDivElement = document.createElement('div');

  const element: HTMLDivElement = document.createElement('div');

  const btn: HTMLButtonElement = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  container.appendChild(btn);

  const pre: HTMLPreElement = document.createElement('pre');
  pre.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n');
  container.appendChild(pre);

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  // Add the image to our existing div.
  const myIcon = new Image();
  myIcon.src = Icon as string;
  console.log('myIcon =', myIcon);

  element.appendChild(myIcon);

  const strong: HTMLElement = document.createElement('strong');
  strong.innerHTML = 'Some bold notion!';

  container.appendChild(element);
  container.appendChild(strong);

  console.log(Data);
  console.log(Notes);

  return container;
}

window.addEventListener('load', () => {
  document.body.appendChild(component());
});
