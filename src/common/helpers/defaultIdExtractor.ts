export function defaultIdExtractor(item: { id: any }): string {
    if (typeof item.id == "string") {
        return item.id;
    } else {
        return item.id.toString();
    }
}

export function defaultKeyExtractor(item: { key: any }): string {
    if (typeof item.key == "string") {
        return item.key;
    } else {
        return item.key.toString();
    }
}