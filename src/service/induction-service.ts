//gets the welcome file url
export function getWelcomeFileUrl(): string{
    return 'https://www.youtube.com/watch?v=-Vui-DhwIAg'
}

// updates the welcome file url with new string value
// returns true if updated, false if anything went wrong
export function setWelcomeFileUrl(url: string){
    console.log(url)
    return true
}

export function setIsCompleted(isCompleted :boolean){
    console.log('video completed')
}

export function getIsCompleted(){
    return true
}