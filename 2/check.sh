#1/bin/sh

# brew install fswatch
fswatch *.ts|xargs -n 1 npm run check