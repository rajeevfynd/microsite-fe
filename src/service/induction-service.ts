//gets the welcome file url
export function getWelcomeFileUrl(): string{
    return 'https://www.youtube.com/watch?v=-Vui-DhwIAg'
}

// updates the welcome file url with new string value
// returns true if updated, false if anything went wrong
export function setWelcomeFileUrl(url: string){
    console.log(url)
    return false? { 
        isUpdated : true,
        message : 'Successfully updated'
    }
    :
    {
        isUpdated: false,
        message: 'Failed! Try again later'
    }
}