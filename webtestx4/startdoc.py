import os
import time

sll=[]
os.system("docker ps -qa >psnote.txt")
outtxt = os.popen('cat psnote.txt')
for i in outtxt:
	s = i.rstrip()
	sll.append(s)
	
sll.reverse()
print sll
	
for j in sll:
	os.system("sudo docker start "+j)

os.system("sudo docker ps")

#time.sleep(10)
#os.system("docker exec -it node pm2 start /data/app/app2.js")
