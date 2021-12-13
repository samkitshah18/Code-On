import requests
def test_endpoint_1():
    program_file = {
    "script": "print(Hello World)",
    "language": "python3",
    "versionIndex": "0",
    "clientId": "fb39fa354d3342fc8a2ba9f6c0391c56",
    "clientSecret":
      "5aa05d3f94aa58b86894e2f11ba91fc6c43625033d2266008ac4fd3dc9f7a627",
  }
    r = requests.post('http://localhost:9000/executeIt', data=program_file)
    print(r)
    assert r.status_code == 201, 'Test case failed'
    print('Testcase passed')

def test_endpoint_2():
    program_file = {
    "script": "print(Hello World)",
    "language": "some wrong language",
    "versionIndex": "0",
    "clientId": "fb39fa354d3342fc8a2ba9f6c0391c56",
    "clientSecret":
      "5aa05d3f94aa58b86894e2f11ba91fc6c43625033d2266008ac4fd3dc9f7a627",
  }
    r = requests.post('http://localhost:9000/executeIt', data=program_file)
    print(r)
    assert r.status_code != 201, 'Test case failed'
    print('Testcase passed')

#test_endpoint_1()
test_endpoint_2()	