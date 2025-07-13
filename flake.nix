{
  inputs = {
  	nixpkgs.url = "github:NixOS/nixpkgs";
  	flake-parts.url = "github:hercules-ci/flake-parts";
  	devenv.url = "github:cachix/devenv";
  	devenv.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = inputs@{ self, nixpkgs, flake-parts, devenv }:
	flake-parts.lib.mkFlake { inherit inputs; } {
	   imports = [
         devenv.flakeModule	
       ];
	
	   systems = [
	     "x86_64-linux"
	     "aarch64-linux"
	   ];
	   perSystem = { config, system, pkgs, ... }: {
	     devenv.shells.default = {	     
	     	languages = {
	     	  javascript.enable = true;
	     	  javascript.pnpm = {
	     	  	enable = true;
	     	  	install.enable = true;
	     	  };
	     	  typescript.enable = true;
	     	};

	     	git-hooks.hooks = {
	     	  prettier.enable = true;
	     	  eslint.enable = true;
	     	};
	     };
	   };
	 };
}
