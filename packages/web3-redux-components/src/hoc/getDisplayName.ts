function getDisplayName(WrappedComponent: any) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default getDisplayName;
