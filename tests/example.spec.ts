import { test, expect } from '@playwright/test';

const items = ['Apple', 'Banana', 'Cherry'];
if(items.includes('Banana')) {
  console.log('Banana is present in the array.');
} else {
  console.log('Banana is not present in the array.');
} 

const fruits = ['Apple', 'Banana', 'Cherry'];
