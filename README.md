# PalauBumpVersionAction
This action bumps the version number in package.json

## Inputs

### `new_version`

**Optional** Specify version directly. Default `""`.

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
- uses: PalauProject/PalauBumpVersionAction@v1.0
  with:
  minor: "true"
```