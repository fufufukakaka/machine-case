import json
import requests

##とりあえずまずは数字とモデルを受け取って保存するところをやる
class Submission(leaderboard,detail,confusion_matrix):
    def __init__(leaderboard,detail,confusion_matrix):
        self.leaderboard = leaderboard
        self.detail = detail
        self.confusion_matrix = confusion_matrix

    def submit_info(self,port=5000):
        response = requests.post(
        'http://0.0.0.0:'+port+'/machine-case/update',{'leaderboard':self.leaderboard,'detail':self.detail,'confusion_matrix':self.confusion_matrix}
        )

if __name__ == '__main__':
    main()
