# echoStart "黄色字 \033[0m"
# echoEnd "绿色字 \033[0m"

#!/bin/bash
echoStart() {
  echo -e "\033[33m $1 $2 $3 start \033[0m"
}
echoEnd() {
  echo -e "\033[32m $1 $2 $3 end \033[0m"
}

cd /d/code/UI-mapcomponent-mapEngine

echoStart "checkout buildv3"
git checkout buildv3
echoEnd "checkout buildv3"

echoStart "pull buildv3"
git pull
echoEnd "pull buildv3"

echoStart "merge dev_v3"
git merge dev_v3
echoEnd "merge dev_v3"

echoStart "push buildv3"
git push
echoEnd "push buildv3"

echoStart "checkout dev_v3"
git checkout dev_v3
echoEnd "checkout dev_v3"
