
const minScore = {
    hip :0.1,
    knee: 0.09,
    ankle: 0.08
}

export const isTorsoVisible= (keypoints_with_score) => {
    return (
        (keypoints_with_score[11]>=minScore.hip || keypoints_with_score[12]>=minScore.hip) &&
        (keypoints_with_score[13]>=minScore.knee || keypoints_with_score[14]>=minScore.knee) &&
        (keypoints_with_score[15]>=minScore.ankle || keypoints_with_score[16]>=minScore.ankle) 
        
    )
}