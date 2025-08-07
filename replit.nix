{ pkgs }: {
  deps = [
    pkgs.python311Full
    pkgs.pip
  ];
  env = {
    PYTHON_LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
      # Add any system libraries your Python packages need here
    ];
    # Set other environment variables if needed
  };
}
