set -exuo pipefail
COLOR=grey
HEADER_TEXT="Notifications for Saturday1"
PUSH_NOTIF_HEADER="We\'re saving this for you!"
PUSH_NOTIF_MSG="You\'re one step away.  Don\'t forget to checkout!"
PUSH_NOTIF_HOST="bandolierstyle.com"
URL_TEXT="bandolierstyle.com"
DASHBOARD_IMAGE=$1
SCREENSHOT_IMAGE=shot.jpg
PUSH_NOTIF_IMAGE=icon.jpg
OUTPUT_IMAGE=out.jpg

BASE_IMAGE=base.jpg
BROWSER_IMAGE=browser.jpg
PUSH_IMAGE=push.jpg
PUSH_TGT=+550+150
BROWSER_TGT=+0+50
HEADER_TGT=+15+35
URL_TGT=+65+70
SCREENSHOT_TGT=+0+75
DASHBOARD_TGT=+200+420
PUSH_NOTIF_HEADER_TGT=+680+180
PUSH_NOTIF_HOST_TGT=+680+200
PUSH_NOTIF_MSG_TGT=+680+225
PUSH_NOTIF_IMAGE_TGT=+560+160


# Create a field of COLOR, N00xN00 pixels
# Add the browser bar
# Add the url to the browser bar
# Add the header
# Add the screenshot image
# Add the push notification icon
# Add the push notification header
# Add the push notification hostname
# Add the push notification message
# Overlay the dashboard sample

# These images were scaled:
## convert icon.jpg -scale 100x icon.jpg
## convert shot.jpg -scale 682x shot.jpg
## convert dash.jpg -scale 800x dash.jpg

convert \
    -size 1024x768 canvas:$COLOR \
    $BROWSER_IMAGE -geometry $BROWSER_TGT -composite \
    $SCREENSHOT_IMAGE -geometry $SCREENSHOT_TGT -composite \
    $PUSH_IMAGE -geometry $PUSH_TGT -composite \
    $DASHBOARD_IMAGE -geometry $DASHBOARD_TGT -composite \
    -font helvetica -pointsize 15 -draw "text $URL_TGT '$URL_TEXT'" \
    -font helvetica -pointsize 32 -draw "text $HEADER_TGT '$HEADER_TEXT'" \
    $PUSH_NOTIF_IMAGE -geometry $PUSH_NOTIF_IMAGE_TGT -composite \
    -font helvetica -pointsize 18 -draw "text $PUSH_NOTIF_HEADER_TGT '$PUSH_NOTIF_HEADER'" \
    -font helvetica -pointsize 10 -draw "text $PUSH_NOTIF_HOST_TGT '$PUSH_NOTIF_HOST'" \
    -font helvetica -pointsize 15 -draw "text $PUSH_NOTIF_MSG_TGT '$PUSH_NOTIF_MSG'" \
    out.jpg
