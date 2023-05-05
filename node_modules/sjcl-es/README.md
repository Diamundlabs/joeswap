# sjcl-es

> Tiny 2.72kB AES-GCM library

- **Tiny**: about 2.72kB after gzipped
- **Mordern**: pure ESM package
- **Reliable**: based on [Stanford Javascript Crypto Library](https://github.com/bitwiseshiftleft/sjcl) with minimal customization

## Installation

```sh
pnpm add sjcl-es
```

## Usage

```js
import sjcl from 'sjcl-es'

const password = sjcl.codec.utf8String.toBits('PASSWORD')
const iv = sjcl.codec.utf8String.toBits('IV')

const cipher = new sjcl.cipher.aes(password)

export function encrypt(plaintext) {
  return sjcl.codec.base64.fromBits(
    sjcl.mode.gcm.encrypt(cipher, sjcl.codec.utf8String.toBits(plaintext), iv)
  )
}

export function decrypt(ciphertext) {
  return sjcl.codec.utf8String.fromBits(
    sjcl.mode.gcm.decrypt(cipher, sjcl.codec.base64.toBits(ciphertext), iv)
  )
}

console.log(encrypt('Hello World!'))
console.log(decrypt('0sFJ9r7c33z7gB4u1pD0xzuX48xaYVBGLj41UQ=='))
```

## Documentation

[https://bitwiseshiftleft.github.io/sjcl/doc/](https://bitwiseshiftleft.github.io/sjcl/doc/)
