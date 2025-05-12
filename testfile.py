import requests
import base64

appKey = 'eB69BIgHxGSAAoHVhsDRL7nAzc5FVFmw'
appSecret = 'IZtiGga4lKXNIqPP'

authUrl = f'https://api.schwabapi.com/v1/oauth/authorize?client_id={appKey}&redirect_uri=https://127.0.0.1'

print(f"Click to authenticate: {authUrl}")

returnedLink = input("Paste the redirect URL here:")

code = f"{returnedLink[returnedLink.index('code=')+5:returnedLink.index('%40')]}@"


headers = {'Authorization': f'Basic {base64.b64encode(bytes(f"{appKey}:{appSecret}", "utf-8")).decode("utf-8")}', 'Content-Type': 'application/x-www-form-urlencoded'}
data= {'grant_type': 'authorization_code', 'code': code, 'redirect_uri': 'https://127.0.0.1'}
response = requests.post('https://api.schwabapi.com/v1/oauth/token', headers=headers, data=data)

print(response.json())