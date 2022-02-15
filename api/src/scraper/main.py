import csv

openfile = "posts"
fReader = csv.reader(open(openfile, "r"))

filename = "teams.csv"
fWriter = csv.writer(open(filename, "w"))
fWriter.writerow(["title", "description", "minidescription", "city", "type", "level", "profile_picture", "is_visible",
                  "phones", "mails", "instagram", "vk", "website", "whats_app", "facebook", "classmates", "tiktok",
                  "twitter", "youtube", "gallery"])


def array_output(array_input):
    temp = ', '.join(array_input)
    return "{" + temp + "}"


for row in fReader:
    
    type = ''
    level = ''
    phones = '{}'
    mails = '{}'
    instagram = ''
    vk = ''
    website = ''
    whats_app = ''
    facebook = ''
    classmates = ''
    tiktok = ''
    twitter = ''
    youtube = ''
    is_visible = 'null'
    gallery = array_output(gallery)
    fWriter.writerow([team_name, description, description, team_city, type, level, profilePicture, is_visible,
                      phones, mails, instagram, vk, website, whats_app, facebook, classmates, tiktok,
                      twitter, youtube, gallery])