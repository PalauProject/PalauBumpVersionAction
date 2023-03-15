# PalauBumpVersionAction
This action bumps the version number in package.json

## Inputs

### `patch`

**Optional** Bump patch version. Default `"false"`.

### `minor`

**Optional** Bump patch version. Default `"false"`.

### `major`

**Optional** Bump patch version. Default `"false"`.

## Outputs

### `new_version`

The new version number.

## Example usage

```yaml
uses: PalauProject/PalauBumpVersionAction
with:
  minor: "true"
```