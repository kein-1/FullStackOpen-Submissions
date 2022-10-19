
# Useful git: 
https://stackoverflow.com/questions/21651185/git-merge-a-remote-branch-locally

To merge from a remote branch:  
-git fetch origin/<branch name>   
-git checkout <branch I want to merge into>  
-git merge origin/<branch name>  

# Incorporate main branch changes to a local branch:
-Say our main branch made changes and then we want to add these changes to our branch brach1
-git checkout branch1 (this puts us in branch1)  
-git merge origin/main