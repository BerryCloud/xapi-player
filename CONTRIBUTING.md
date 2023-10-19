## Publishing a new version

### Creating a GitHub Release

Check the version number of the latest [GitHub release](https://github.com/BerryCloud/xapi-player/releases).

Draft a [new GitHub release](https://github.com/BerryCloud/xapi-player/releases/new) with the next version number.

Select `Choose a tag` and type the new version number prefixed with `v` and select `create new tag: v*.*.* on publish`.

Ensure that the target is `main`.

The release title should be the new version number prefixed with `v`.

Publish the release.

Once the GitHub release has been created, GitHub actions will publish the new version of the documentation to the [github pages site](https://berrycloud.github.io/xapi-player/).
