class PackageJsonModel {
  constructor(packageJson) {
    this.name = packageJson.name || null;
    this.description = packageJson.description || null;
    this.scripts = packageJson.scripts ? this.createScripts(packageJson.scripts) : null;
  }

  createScripts(scripts) {
    return Object.keys(scripts).map(key => {
      return {
        key: key,
        command: scripts[key]
      };
    })
  }
}

module.exports = {
  PackageJsonModel
};
